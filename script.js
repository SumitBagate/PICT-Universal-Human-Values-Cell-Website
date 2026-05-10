// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId !== "#") {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// ===== ACTIVE NAVBAR LINK ON SCROLL =====
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".navbar-nav a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  }
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Show success message
    alert("Thank you for your message! We will get back to you soon.");

    // Reset form
    contactForm.reset();

    // Note: For actual functionality, you would need a backend service
    // to handle the form submission. This is just a front-end validation.
  });
}

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarToggler.offsetParent !== null) {
      // Check if navbar toggler is visible
      navbarToggler.click();
    }
  });
});

// ===== FADE IN ANIMATION ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and sections
document
  .querySelectorAll(
    ".objective-card, .committee-card, .gallery-item, .timeline-content",
  )
  .forEach((element) => {
    observer.observe(element);
  });

// ===== MARQUEE ANIMATION SETUP =====
// The marquee animation is defined in CSS, this just ensures smooth playback
const announcementItems = document.querySelectorAll(".announcement-item");
announcementItems.forEach((item, index) => {
  // Clone items for seamless looping
  const clone = item.cloneNode(true);
  item.parentElement.appendChild(clone);
});

// ===== SCROLL TO TOP BUTTON =====
// Create a scroll-to-top button dynamically
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollToTopBtn);

// Add styles for scroll-to-top button
const style = document.createElement("style");
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    }

    .scroll-to-top:hover {
        background-color: #1e40af;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
    }

    .scroll-to-top.show {
        display: flex;
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide scroll-to-top button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== ADD ANIMATION DELAY TO CARDS =====
const delayElements = document.querySelectorAll(
  ".objective-card, .committee-card, .gallery-item",
);
delayElements.forEach((element, index) => {
  element.style.animationDelay = `${index * 0.1}s`;
});

// ===== LAZY LOADING IMAGES (for future use) =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===== KEYBOARD NAVIGATION SUPPORT =====
// Skip to main content link for accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const toggler = document.querySelector(".navbar-toggler");
      toggler.click();
    }
  }
});

// ===== CONSOLE LOG FOR DEVELOPMENT =====
console.log(
  "%cWelcome to PICT UHV Cell Website",
  "color: #2563eb; font-size: 20px; font-weight: bold;",
);
console.log("Built with HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript");
