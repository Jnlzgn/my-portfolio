document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav .nav-links a");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links");
  const sections = document.querySelectorAll("section, header");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.getAttribute("data-visible") === "true";
      navMenu.setAttribute("data-visible", String(!isOpen));
      navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          navMenu.setAttribute("data-visible", "false");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  function updateActiveLink() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.id;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          id &&
            link.getAttribute("href") === `#${id}` &&
            scrollPosition >= top &&
            scrollPosition < top + height,
        );
      });
    });
  }

  function smoothScroll(event) {
    const targetId = this.getAttribute("href");
    if (!targetId || !targetId.startsWith("#") || targetId === "#") {
      return;
    }

    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  function revealSections() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  function updateNavbar() {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", function () {
    revealSections();
    updateActiveLink();
    updateNavbar();
  });

  revealSections();
  updateActiveLink();
  updateNavbar();

  console.log("Portfolio script initialized.");
});
