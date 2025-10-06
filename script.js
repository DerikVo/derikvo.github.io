document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

  function setIconVisibility() {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
      if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add("hidden");
    } else {
      if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
      if (themeToggleLightIcon) themeToggleLightIcon.classList.add("hidden");
    }
  }

  setIconVisibility();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");

      let theme = "light";
      if (document.documentElement.classList.contains("dark")) {
        theme = "dark";
      }
      localStorage.setItem("color-theme", theme);

      setIconVisibility();
    });
  }

  // --- Smooth Scrolling for anchor links on the same page ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Check if the link is just a placeholder or for a dropdown
      if (this.getAttribute("href") === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // --- Mobile Menu Toggle Logic ---
  const nav = document.querySelector("nav");

  if (nav) {
    const navContainer = nav.querySelector(".container");
    const navMenu = nav.querySelector("ul");
    let menuToggle = document.getElementById("mobile-menu-toggle");

    // Create hamburger button if it doesn't exist
    if (!menuToggle && navContainer && navMenu) {
      menuToggle = document.createElement("button");
      menuToggle.id = "mobile-menu-toggle";
      menuToggle.className = "mobile-menu-toggle";
      menuToggle.setAttribute("aria-label", "Toggle navigation menu");
      menuToggle.innerHTML = `
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      `;

      // Insert before the nav menu
      navMenu.parentNode.insertBefore(menuToggle, navMenu);
    }

    if (menuToggle && navMenu) {
      // Toggle menu on button click
      menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          navMenu.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      });

      // Close menu when clicking a link (except dropdowns)
      navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function (e) {
          // Don't close if it's a dropdown button
          if (!this.classList.contains("dropbtn")) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
          }
        });
      });

      // Handle dropdown clicks on mobile
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach((dropdown) => {
        const dropbtn = dropdown.querySelector(".dropbtn");
        if (dropbtn) {
          dropbtn.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              dropdown.classList.toggle("active");
            }
          });
        }
      });
    }
  }
});
