document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Controls
  const menuButton = document.getElementById("menu-button");
  const navLinks = document.getElementById("nav-links");
  const closeMenu = document.getElementById("close-menu");
  const mobileNavAnchors = navLinks ? navLinks.querySelectorAll("a") : [];

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.remove("-translate-x-full");
      navLinks.classList.add("translate-x-0");
      document.body.classList.add("overflow-hidden");
    });
  }

  const closeMobileMenu = () => {
    if (navLinks) {
      navLinks.classList.remove("translate-x-0");
      navLinks.classList.add("-translate-x-full");
      document.body.classList.remove("overflow-hidden");
    }
  };

  if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
  }

  mobileNavAnchors.forEach((anchor) => {
    anchor.addEventListener("click", closeMobileMenu);
  });

  // Creations Category Filter
  const filterBtns = document.querySelectorAll(".creation-filter-btn");
  const creationCards = document.querySelectorAll(".creation-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white", "shadow-lg");
        b.classList.add("bg-emerald-950/40", "text-slate-300", "hover:bg-emerald-900/60");
      });
      btn.classList.remove("bg-emerald-950/40", "text-slate-300", "hover:bg-emerald-900/60");
      btn.classList.add("bg-emerald-600", "text-white", "shadow-lg");

      const category = btn.getAttribute("data-category");

      creationCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answerDiv = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (questionBtn && answerDiv) {
      questionBtn.addEventListener("click", () => {
        const isOpen = !answerDiv.classList.contains("hidden");

        // Close all other faqs
        faqItems.forEach((otherItem) => {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-icon");
          if (otherAnswer && otherAnswer !== answerDiv) {
            otherAnswer.classList.add("hidden");
            if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
          }
        });

        if (isOpen) {
          answerDiv.classList.add("hidden");
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          answerDiv.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    }
  });

  // Contact Form Submission Feedback
  const contactForm = document.getElementById("contact-form");
  const formToast = document.getElementById("form-toast");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : "Submit";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
        }

        if (formToast) {
          formToast.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
          formToast.classList.add("opacity-100", "translate-y-0");

          setTimeout(() => {
            formToast.classList.remove("opacity-100", "translate-y-0");
            formToast.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
          }, 4000);
        }
      }, 1200);
    });
  }

  // Demo Modal Handler
  const demoModalBtns = document.querySelectorAll(".demo-trigger");
  const demoModal = document.getElementById("demo-modal");
  const closeDemoModal = document.getElementById("close-demo-modal");

  if (demoModalBtns.length && demoModal) {
    demoModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        demoModal.classList.remove("hidden");
        demoModal.classList.add("flex");
      });
    });

    if (closeDemoModal) {
      closeDemoModal.addEventListener("click", () => {
        demoModal.classList.add("hidden");
        demoModal.classList.remove("flex");
      });
    }

    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) {
        demoModal.classList.add("hidden");
        demoModal.classList.remove("flex");
      }
    });
  }
});