// Toggle mobile navigation
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links ul");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Back to Top Button Logic
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    backToTopBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  // Basic Form Validation for All Forms
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const inputs = this.querySelectorAll("input[required], textarea[required]");
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.classList.add("input-error");
          valid = false;
        } else {
          input.classList.remove("input-error");
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  });

  // Contact Form Specific Validation
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear previous messages
      formMessage.textContent = "";
      formMessage.style.color = "";

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const phone = contactForm.phone.value.trim();
      const message = contactForm.message.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{10,15}$/;

      if (name.length < 2) {
        formMessage.textContent = "Please enter a valid name (at least 2 characters).";
        formMessage.style.color = "red";
        contactForm.name.focus();
        return;
      }

      if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "red";
        contactForm.email.focus();
        return;
      }

      if (phone.length > 0 && !phonePattern.test(phone)) {
        formMessage.textContent = "Please enter a valid phone number (10-15 digits).";
        formMessage.style.color = "red";
        contactForm.phone.focus();
        return;
      }

      if (message.length < 10) {
        formMessage.textContent = "Please enter a message of at least 10 characters.";
        formMessage.style.color = "red";
        contactForm.message.focus();
        return;
      }

      formMessage.textContent = "Thank you for your enquiry! We will get back to you soon.";
      formMessage.style.color = "green";
      contactForm.reset();
    });
  }

  // Simple Search Feature (Filter Links by Query)
  const searchInput = document.querySelector(".srch");
  const searchButton = document.querySelector(".btn");

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      const links = document.querySelectorAll(".nav-links a");
      let found = false;

      links.forEach((link) => {
        if (link.textContent.toLowerCase().includes(query)) {
          window.location.href = link.href;
          found = true;
        }
      });

      if (!found) {
        alert("No matching page found for: " + query);
      }
    });
  }
});
