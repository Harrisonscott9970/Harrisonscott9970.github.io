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
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Theme toggle (remembered per visitor)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch {}
document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// Scroll reveal
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Typing effect
const typed = document.querySelector(".typed");
const words = typed.dataset.words.split("|");
let w = 0, c = words[0].length, deleting = true;
function tick() {
  const word = words[w];
  c += deleting ? -1 : 1;
  typed.textContent = word.slice(0, c);
  let delay = deleting ? 40 : 80;
  if (!deleting && c === word.length) { deleting = true; delay = 1800; }
  else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
  setTimeout(tick, delay);
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setTimeout(tick, 2000);
