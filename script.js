// ====== YOUR LINKS ======
const LINKS = {
  linkedin: "https://www.linkedin.com/in/harrison-scott-8510582a5/",
  github: "https://github.com/Harrisonscott9970",
};

document.querySelectorAll(".js-linkedin").forEach((a) => (a.href = LINKS.linkedin));
document.querySelectorAll(".js-github").forEach((a) => (a.href = LINKS.github));
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const setMenu = (open) => {
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
};
toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Theme toggle (remembered per visitor, defaults to system setting)
const root = document.documentElement;
const prefersDark = matchMedia("(prefers-color-scheme: dark)");
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch {}
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const current = root.dataset.theme || (prefersDark.matches ? "dark" : "light");
  root.dataset.theme = current === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});
