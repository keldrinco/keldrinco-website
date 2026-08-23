document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
if (form) {
  const status = document.getElementById("form-status");
  const submitBtn = form.querySelector(".form-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.removeAttribute("data-state");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      company: form.company.value, // honeypot -- should always be empty for real visitors
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        form.reset();
        status.textContent = "Thanks — your message is on its way. We'll be in touch soon.";
        status.setAttribute("data-state", "success");
      } else {
        status.textContent = data.error || "Something went wrong. Please email hello@keldrin.co directly.";
        status.setAttribute("data-state", "error");
      }
    } catch (err) {
      status.textContent = "Something went wrong. Please email hello@keldrin.co directly.";
      status.setAttribute("data-state", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });
}
