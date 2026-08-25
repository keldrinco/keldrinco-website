document.getElementById("year").textContent = new Date().getFullYear();

// nav: subtle elevation once the page scrolls past the top
const siteNav = document.querySelector(".nav-sticky");
if (siteNav) {
  const SCROLL_THRESHOLD = 12;
  const setNavState = () => {
    siteNav.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
}

// motion: scroll reveal + subtle parallax on the photo layers.
// Kept restrained on purpose -- one-time reveal per element, small
// translate values, and a full bypass for prefers-reduced-motion.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

if (!prefersReducedMotion) {
  const parallaxLayers = Array.from(document.querySelectorAll("[data-parallax] img"));
  if (parallaxLayers.length) {
    let ticking = false;
    const applyParallax = () => {
      parallaxLayers.forEach((img) => {
        const speed = parseFloat(img.parentElement.dataset.parallax) || 0.1;
        const rect = img.parentElement.getBoundingClientRect();
        img.style.transform = `translateY(${rect.top * speed * -1}px)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
      }
    };
    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }
}

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
