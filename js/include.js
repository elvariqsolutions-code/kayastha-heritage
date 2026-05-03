function loadComponent(id, file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html"); // ✅ relative path
  loadComponent("footer", "components/footer.html");
});
