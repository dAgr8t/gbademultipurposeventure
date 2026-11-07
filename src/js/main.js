(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const setMenu = (open) => {
    if (!menuButton || !nav) return;
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = open ? "×" : "☰";
  };
  menuButton?.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  nav
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setMenu(false);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    revealItems.forEach((el) => observer.observe(el));
  } else revealItems.forEach((el) => el.classList.add("is-visible"));

  const progress = document.querySelector(".top-progress");
  let ticking = false;
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true },
  );
  updateProgress();

  document
    .querySelectorAll("[data-current-year]")
    .forEach((el) => (el.textContent = new Date().getFullYear()));

  const form = document.querySelector("form#quote-form");
  const divisionSelect = document.querySelector("#division");
  const requestedDivision = new URLSearchParams(window.location.search).get("division");
  if (divisionSelect && ["tractor", "truck"].includes(requestedDivision))
    divisionSelect.value = requestedDivision;
  const status = document.querySelector("#form-status");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (status) {
      status.textContent =
        "Your form passed the browser checks. This is a frontend prototype: connect a form endpoint or backend before accepting real enquiries. No message has been sent.";
      status.classList.add("show");
      status.setAttribute("role", "status");
    }
  });

  // Replace this placeholder with the client's verified international-format WhatsApp number.
  // Example format only: country code + number, digits only. Do not publish until confirmed.
  const whatsappNumber = "2347073223360";
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    if (/^\d{10,15}$/.test(whatsappNumber)) link.href = `https://wa.me/${whatsappNumber}`;
    else {
      link.href = "contact.html#contact-details";
      link.setAttribute("aria-label", "WhatsApp placeholder — add the verified company number");
    }
  });
})();
