const { Resend } = require("resend");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const name = (body.name || "").toString().trim().slice(0, 200);
  const email = (body.email || "").toString().trim().slice(0, 200);
  const message = (body.message || "").toString().trim().slice(0, 5000);
  // Hidden honeypot field -- real visitors never see or fill it, bots often do.
  const honeypot = (body.company || "").toString().trim();

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

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables");
    return res.status(500).json({
      ok: false,
      error: "Something went wrong on our end. Please email hello@keldrin.co directly.",
    });
  }

  try {
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/website_contact_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, email, message, source: "keldrin.co" }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("Supabase insert failed:", insertRes.status, errText);
      return res.status(500).json({
        ok: false,
        error: "Something went wrong saving your message. Please email hello@keldrin.co directly.",
      });
    }
  } catch (err) {
    console.error("Supabase insert error:", err);
    return res.status(500).json({
      ok: false,
      error: "Something went wrong saving your message. Please email hello@keldrin.co directly.",
    });
  }

  // Email notification -- only fires once RESEND_API_KEY is set in Vercel's
  // environment variables. Until then, submissions are still safely stored
  // above; this whole block is a no-op. A failure here never fails the request,
  // since the submission is already saved.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.NOTIFY_FROM || "Keldrin Website <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL || "hopp@keldrin.co",
        replyTo: email,
        subject: `New Keldrin contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } catch (err) {
      console.error("Email notification failed (submission was still saved):", err);
    }
  }

  return res.status(200).json({ ok: true });
};
