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
// Lighthouse toggle: the beam sweeps round and the theme flips mid-sweep
const toggleBtn = document.querySelector(".theme-toggle");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");
const labelToggle = () =>
  toggleBtn.setAttribute("aria-label", currentTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode");
const flipTheme = () => {
  root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  labelToggle();
};
labelToggle();
toggleBtn.addEventListener("click", () => {
  if (reduceMotion.matches) return flipTheme();
  if (toggleBtn.classList.contains("flash")) return;
  toggleBtn.classList.add("flash");
  setTimeout(flipTheme, 450);
  setTimeout(() => toggleBtn.classList.remove("flash"), 1150);
});
