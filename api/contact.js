const { Resend } = require("resend");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const TABLE = "website_contact_submissions";

const GENERIC_ERROR =
  "Something went wrong on our end. Please email hello@keldrin.co directly.";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value, max) {
  return (value || "").toString().trim().slice(0, max);
}

/* Best-effort rate limit. Serverless instances are ephemeral and there may be
   several of them, so this throttles the common case (one script hammering a
   warm instance) rather than acting as a real guarantee. If the form ever
   attracts sustained abuse, put a proper check in front of it instead. */
const HITS = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();

  for (const [key, times] of HITS) {
    const fresh = times.filter((t) => now - t < WINDOW_MS);
    if (fresh.length) HITS.set(key, fresh);
    else HITS.delete(key);
  }

  const mine = HITS.get(ip) || [];
  if (mine.length >= MAX_PER_WINDOW) return true;
  mine.push(now);
  HITS.set(ip, mine);
  return false;
}

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.headers["x-real-ip"] || "";
}

async function insertSubmission(row) {
  return fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const intent = clean(body.intent, 120);
  const message = clean(body.message, 5000);
  // Hidden honeypot field -- real visitors never see or fill it, bots often do.
  const honeypot = clean(body.company, 200);

  if (honeypot) {
    // Pretend success so bots don't learn the field is being checked.
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Please fill in your name, email, and message." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({
      ok: false,
      error: "That's a few messages in a short window. Please email hello@keldrin.co directly.",
    });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables");
    return res.status(500).json({ ok: false, error: GENERIC_ERROR });
  }

  /* The live table may or may not have the phone/intent columns yet (see
     db/001_add_phone_intent.sql). Try the full row first; if PostgREST rejects
     it because a column is missing, fall back to the original shape and keep
     the extra detail by folding it into the message body. Either way the
     submission is never lost. */
  const extras = [];
  if (intent) extras.push(`Intent: ${intent}`);
  if (phone) extras.push(`Phone: ${phone}`);

  try {
    let insertRes = await insertSubmission({
      name,
      email,
      phone: phone || null,
      intent: intent || null,
      message,
      source: "keldrin.co",
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      const schemaMismatch =
        insertRes.status === 400 &&
        /column|schema cache|PGRST204/i.test(errText);

      if (!schemaMismatch) {
        console.error("Supabase insert failed:", insertRes.status, errText);
        return res.status(500).json({ ok: false, error: GENERIC_ERROR });
      }

      console.warn(
        "Supabase insert rejected the phone/intent columns; falling back. Run db/001_add_phone_intent.sql to store them properly."
      );
      insertRes = await insertSubmission({
        name,
        email,
        message: extras.length ? `${extras.join("\n")}\n\n${message}` : message,
        source: "keldrin.co",
      });

      if (!insertRes.ok) {
        console.error("Supabase fallback insert failed:", insertRes.status, await insertRes.text());
        return res.status(500).json({ ok: false, error: GENERIC_ERROR });
      }
    }
  } catch (err) {
    console.error("Supabase insert error:", err);
    return res.status(500).json({ ok: false, error: GENERIC_ERROR });
  }

  /* Email is best-effort from here on. The submission is already stored, so a
     mail failure must never turn into an error for the person who wrote in. */
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.NOTIFY_FROM || "Keldrin Website <onboarding@resend.dev>";
    const notifyTo = process.env.NOTIFY_EMAIL || "hopp@keldrin.co";

    const detailLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      intent ? `About: ${intent}` : null,
    ].filter(Boolean);

    try {
      await resend.emails.send({
        from,
        to: notifyTo,
        replyTo: email,
        subject: intent
          ? `Keldrin site — ${name} (${intent})`
          : `Keldrin site — new message from ${name}`,
        text: `${detailLines.join("\n")}\n\n${message}\n`,
      });
    } catch (err) {
      console.error("Notification email failed (submission was still saved):", err);
    }

    /* Acknowledgement to the sender. Someone who writes in at 9pm gets a real
       reply immediately rather than wondering whether the form worked. */
    try {
      await resend.emails.send({
        from,
        to: email,
        replyTo: "hello@keldrin.co",
        subject: "Thanks for reaching out to Keldrin",
        text: [
          `Hi ${name.split(" ")[0]},`,
          "",
          "Thanks for getting in touch. Your message came through and it's in front of our team now — a person reads every one of these, not a filter.",
          "",
          "We usually reply within one business day. If it's time-sensitive before then, reply straight to this email or call us on 270-477-2582 and it lands in the same place.",
          "",
          "For reference, here's what you sent:",
          "",
          message,
          "",
          "—",
          "The Keldrin Team",
          "Keldrin LLC — Paducah, Kentucky",
          "hello@keldrin.co | 270-477-2582 | keldrin.co",
        ].join("\n"),
      });
    } catch (err) {
      console.error("Acknowledgement email failed (submission was still saved):", err);
    }
  }

  return res.status(200).json({ ok: true });
};
