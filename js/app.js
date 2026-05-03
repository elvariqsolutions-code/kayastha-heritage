// ===============================
// Load common components
// ===============================
function loadComponent(id, file) {
  return fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(err));
}

// ===============================
// Load page content
// ===============================
function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Page not found: ${page}`);
      return res.text();
    })
    .then(data => {
      document.getElementById("content").innerHTML = data;

      // Scroll to section if exists
      handleHashScroll();
    })
    .catch(err => {
      console.error(err);
      document.getElementById("content").innerHTML = "<h2>Page not found</h2>";
    });
}

// ===============================
// Get page from URL hash
// ===============================
function getPageFromHash() {
  const hash = window.location.hash; // e.g. #/event#section

  if (!hash || !hash.includes("#/")) return "home";

  const parts = hash.split("#/")[1]; // event#section
  if (!parts) return "home";

  return parts.split("#")[0]; // event
}

// ===============================
// Navigate (with optional section)
// ===============================
function navigate(page, sectionId = "") {
  const url = sectionId
    ? `#/${page}#${sectionId}`
    : `#/${page}`;

  window.location.hash = url;
}

// ===============================
// Scroll to section
// ===============================
function handleHashScroll() {
  const hash = window.location.hash;

  // Extract section id (after second #)
  const parts = hash.split("#/");
  if (parts.length < 2) return;

  const sectionPart = parts[1].split("#")[1]; // section id
  if (!sectionPart) return;

  const selector = `#${sectionPart}`;

  setTimeout(() => {
    const element = document.querySelector(selector);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Optional highlight
      element.style.outline = "2px solid #007bff";
      setTimeout(() => {
        element.style.outline = "none";
      }, 1500);
    }
  }, 100);
}

// ===============================
// Handle hash change (navigation)
// ===============================
window.addEventListener("hashchange", () => {
  loadPage(getPageFromHash());
});

// ===============================
// Initial Load
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  // Load header & footer once
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  // Load initial page
  loadPage(getPageFromHash());
});
