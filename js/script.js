// Project data
const projects = [
  {
    id: 1,
    title: "Burger Farm (Django)",
    description:
      "A modern, feature-rich burger ordering platform built with Django, featuring recommendations, real-time order tracking, secure payments, and comprehensive admin management",
    image: "img/projects/djangoburger.png",
    tags: ["Django", "Python", "Sqlite3", "2025"],
    githubLink: "https://github.com/abhi-patel-0411/django_burger_farm",
    liveLink: "https://django-burger-farm.onrender.com/",
    year: 2025,
    tech: ["Django", "Python", "Sqlite3"],
  },
  {
    id: 2,
    title: "Book my Cinema (Mern)",
    description:
      "Book My Cinema is a modern movie ticket booking platform that allows users to browse movies, select seats in real-time, and complete secure bookings. The system includes both user-facing features and comprehensive admin management tools",
    image: "img/projects/bookmycinema.png",
    tags: [
      "React",
      "Nodejs/Expressjs",
      "Css/Bootstrap",
      "Mongodb Atlas",
      "2025",
    ],
    githubLink: "https://github.com/abhi-patel-0411/bookmycinema",
    liveLink: "https://bookmycinema.vercel.app/",
    year: 2025,
    tech: ["React", "Nodejs/Expressjs", "Css/Bootstrap", "Mongodb Atlas"],
  },
  {
    id: 3,
    title: "E-Mart (Django+React)",
    description:
      "E-Mart is a comprehensive full-stack e-commerce platform built with Django REST Framework (backend) and React.js (frontend). It provides a complete online shopping experience with advanced features like ML-based recommendations, offer management, payment integration, and comprehensive admin dashboard.",
    image: "img/projects/Emart.png",
    tags: ["React", "Python", "Css/Bootstrap", "Sqlite3", "2025"],
    githubLink: "https://github.com/abhi-patel-0411/E_Mart",
    liveLink: "https://e-mart-eta.vercel.app/",
    year: 2025,
    tech: ["React", "Python", "Css/Bootstrap", "Sqlite3"],
  },
  {
    id: 4,
    title: "Burger Farm (Front-end)",
    description:
      "Burger Farm is a web application that allows users to order custom burgers, manage their cart, and download bills. It includes features like user authentication, cart management, order customization, and delivery status tracking.",
    image: "img/projects/burger3rdsem.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "2024-2025"],
    githubLink: "https://github.com/abhi-patel-0411/Burger_Farm",
    liveLink: "https://burger-farm-psi.vercel.app/",
    year: 2025,
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    id: 5,
    title: "Palladium Movie Ticket Booking",
    description:
      "This project is a web-based application designed to provide users with a seamless experience for booking movie tickets online. Built using HTML, CSS, JavaScript and Bootstrap, this system offers a range of functionalities to enhance the user experience.",
    image: "img/projects/palladium.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "2024-2025"],
    githubLink:
      "https://github.com/abhi-patel-0411/Palladium_movie_ticket_booking",
    liveLink: "https://palladium-movie-ticket-booking.vercel.app/",
    year: 2025,
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    id: 6,
    title: "Bus_reservation_system",
    description:
      "The Bus Reservation System is a Java console application that provides a complete solution for managing bus bookings, user accounts, and administrative operations. The system supports role-based access with separate functionalities for users and administrators.",
    image: "",
    tags: ["JAVA", "JDBC", "DATA STRUCTURE", "XAMPP", "2024"],
    githubLink: "https://github.com/abhi-patel-0411/Bus_reservation_system",
    liveLink: "",
    year: 2024,
    tech: ["JAVA", "JDBC"],
  },
];

// DOM elements
const projectsGrid = document.getElementById("projectsGrid");
const filterInput = document.querySelector(".filter-input");
const themeToggle = document.querySelector(".theme-toggle");
const refreshBtn = document.querySelector(".refresh-btn");

// State
let filteredProjects = [...projects];
let currentTheme = localStorage.getItem("theme") || "light";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
  renderProjects();
  setupEventListeners();
  createFloatingDots();
  setupDropdowns();
  setupResumeButton();
  setupContactForm();
  setupMobileNavClose();
});

// Mobile navbar auto-close functionality
function setupMobileNavClose() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const navbarCollapse = document.getElementById("navbarNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Only close if navbar is currently collapsed (mobile view) and toggler is visible
      if (
        navbarToggler &&
        navbarCollapse &&
        window.getComputedStyle(navbarToggler).display !== "none" &&
        navbarCollapse.classList.contains("show")
      ) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });
}

function initializeTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
  createFloatingDots();
}

function updateThemeIcon() {
  const icon = themeToggle?.querySelector("svg path");
  if (icon) {
    if (currentTheme === "dark") {
      icon.setAttribute(
        "d",
        "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      );
    } else {
      icon.setAttribute("d", "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z");
    }
  }
}

// Project rendering
function renderProjects() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";
  projectsGrid.className = "projects-grid";

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted); grid-column: 1 / -1;">
                <p>No projects found matching your criteria.</p>
            </div>
        `;
    return;
  }

  const isIndexPage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "";
  const projectsToShow = isIndexPage
    ? filteredProjects.slice(0, 3)
    : filteredProjects.sort((a, b) => b.year - a.year);

  projectsToShow.forEach((project) => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });

  if (isIndexPage && filteredProjects.length > 3) {
    const viewAllDiv = document.createElement("div");
    viewAllDiv.className = "view-all-projects";
    viewAllDiv.style.gridColumn = "1 / -1";
    viewAllDiv.innerHTML = `
            <a href="projects.html" class="view-all-btn">
                <span>View All Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                </svg>
            </a>
        `;
    projectsGrid.appendChild(viewAllDiv);
  }
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  const liveLinkIcon = project.liveLink
    ? `| <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="live-link">
            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:15px"></i>
        </a>`
    : "";

  // Create image element with fallback
  const imageContent =
    project.image && project.image.trim() !== ""
      ? `<img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"/>
       <div class="project-logo-fallback" style="display:none;">
         <div class="logo-text">AP</div>
         <div class="logo-subtitle">Abhi Poshiya
</div>
       </div>`
      : `<div class="project-logo-fallback">
         <div class="logo-text">AP</div>
         <div class="logo-subtitle">Abhi Poshiya
</div>
       </div>`;

  card.innerHTML = `
        <div class="project-image">
            ${imageContent}
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">
                    ${project.title} 
                    ${liveLinkIcon}
                </h3>
                <a href="${
                  project.githubLink
                }" target="_blank" rel="noopener noreferrer" class="github-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags
                  .map((tag) => `<span class="project-tag">${tag}</span>`)
                  .join("")}
            </div>
        </div>
    `;

  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-4px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });

  return card;
}

// Filtering
function filterProjects(query) {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) {
    filteredProjects = [...projects];
  } else {
    filteredProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        project.tech.some((tech) => tech.toLowerCase().includes(searchTerm))
    );
  }

  renderProjects();
}

// Event listeners
function setupEventListeners() {
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (filterInput) {
    filterInput.addEventListener("input", function (e) {
      filterProjects(e.target.value);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      const svg = this.querySelector("svg");
      svg.style.transform = "rotate(360deg)";
      setTimeout(() => {
        svg.style.transform = "rotate(0deg)";
      }, 500);

      if (filterInput) {
        filterInput.value = "";
      }
      filteredProjects = [...projects];
      renderProjects();
      createFloatingDots();
    });
  }
}

// Dropdown functionality
function setupDropdowns() {
  const techDropdown = document.getElementById("techDropdown");
  const yearDropdown = document.getElementById("yearDropdown");
  const techMenu = document.getElementById("techDropdownMenu");
  const yearMenu = document.getElementById("yearDropdownMenu");

  if (!techDropdown || !yearDropdown || !techMenu || !yearMenu) {
    return;
  }

  techDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    techMenu.classList.toggle("show");
    techDropdown.classList.toggle("active");
    yearMenu.classList.remove("show");
    yearDropdown.classList.remove("active");
  });

  yearDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    yearMenu.classList.toggle("show");
    yearDropdown.classList.toggle("active");
    techMenu.classList.remove("show");
    techDropdown.classList.remove("active");
  });

  techMenu.addEventListener("click", function (e) {
    if (e.target.classList.contains("dropdown-item")) {
      const tech = e.target.getAttribute("data-tech");
      if (tech === "All") {
        filteredProjects = [...projects];
        if (filterInput) filterInput.value = "";
      } else {
        filteredProjects = projects.filter(
          (project) =>
            project.tech.some((t) => t.toLowerCase() === tech.toLowerCase()) ||
            project.tags.some((tag) => tag.toLowerCase() === tech.toLowerCase())
        );
        if (filterInput) filterInput.value = tech;
      }
      renderProjects();
      techMenu.classList.remove("show");
      techDropdown.classList.remove("active");
    }
  });

  yearMenu.addEventListener("click", function (e) {
    if (e.target.classList.contains("dropdown-item")) {
      const year = e.target.getAttribute("data-year");
      if (year === "All") {
        filteredProjects = [...projects];
        if (filterInput) filterInput.value = "";
      } else {
        filteredProjects = projects.filter(
          (project) => project.year.toString() === year
        );
        if (filterInput) filterInput.value = year;
      }
      renderProjects();
      yearMenu.classList.remove("show");
      yearDropdown.classList.remove("active");
    }
  });

  document.addEventListener("click", function () {
    techMenu.classList.remove("show");
    yearMenu.classList.remove("show");
    techDropdown.classList.remove("active");
    yearDropdown.classList.remove("active");
  });
}

// Enhanced floating dots animation
function createFloatingDots() {
  const background = document.querySelector(".floating-dots");
  if (!background) return;

  background.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    const dot = document.createElement("div");
    dot.className = "floating-dot";

    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 5;
    const delay = Math.random() * 10;

    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.left = left + "%";
    dot.style.animationDuration = animationDuration + "s";
    dot.style.animationDelay = delay + "s";

    if (currentTheme === "dark") {
      dot.style.background = "rgba(255, 255, 255, 1)";
    } else {
      dot.style.background = "rgba(0, 0, 0, 1)";
    }

    background.appendChild(dot);
  }
}

// Smooth scrolling for internal links
document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Resume button functionality
function setupResumeButton() {
  const resumeBtn = document.querySelector(".resume-btn-small");
  if (!resumeBtn) return;

  resumeBtn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "translateY(-1px)";
    }, 150);

    // Detect mobile device
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const pdfUrl = "AbhiPoshiyaResume.pdf";

    if (isMobile) {
      // For mobile devices, force download or use Google Docs viewer
      const link = document.createElement("a");
      link.href = `https://docs.google.com/viewer?url=${encodeURIComponent(
        window.location.origin + "/" + pdfUrl
      )}&embedded=true`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For desktop, open in new tab
      window.open(pdfUrl, "_blank");
    }
  });
}

function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector(".submit-btn");

  // Check if returning from successful submission
  if (
    window.location.hash === "#contact" &&
    document.referrer.includes("formspree.io")
  ) {
    showSuccessMessage();
  }

  contactForm.addEventListener("submit", function (e) {
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
  });

  function showSuccessMessage() {
    const successDiv = document.createElement("div");
    successDiv.className = "alert alert-success";
    successDiv.style.cssText =
      "position: fixed; top: 20px; right: 20px; z-index: 9999; padding: 15px; background: #4CAF50; color: white; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
    successDiv.innerHTML =
      '<i class="fas fa-check-circle"></i> Message sent successfully!';
    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });

    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgb(239, 68, 68)") {
        this.style.borderColor = "";
      }
    });
  });
}
