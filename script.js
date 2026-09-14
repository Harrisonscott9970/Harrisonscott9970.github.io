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

// Devtools-style inspector: rests on the name, follows whatever you hover
const inspector = document.getElementById("inspector");
const [mBox, pBox, cBox] = inspector.querySelectorAll(".ins-m, .ins-p, .ins-c");
const label = inspector.querySelector(".ins-label");
const home = document.querySelector(".hero-name");
let target = home;

function place(el, x, y, w, h) {
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.width = Math.max(0, w) + "px";
  el.style.height = Math.max(0, h) + "px";
}

function draw() {
  const r = target.getBoundingClientRect();
  const cs = getComputedStyle(target);
  const px = (prop) => parseFloat(cs[prop]) || 0;
  const m = { t: px("marginTop"), r: px("marginRight"), b: px("marginBottom"), l: px("marginLeft") };
  const inset = {
    t: px("paddingTop") + px("borderTopWidth"),
    r: px("paddingRight") + px("borderRightWidth"),
    b: px("paddingBottom") + px("borderBottomWidth"),
    l: px("paddingLeft") + px("borderLeftWidth"),
  };

  place(mBox, r.left - m.l, r.top - m.t, r.width + m.l + m.r, r.height + m.t + m.b);
  place(pBox, r.left, r.top, r.width, r.height);
  place(cBox, r.left + inset.l, r.top + inset.t, r.width - inset.l - inset.r, r.height - inset.t - inset.b);

  label.querySelector(".ins-tag").textContent = target.tagName.toLowerCase();
  label.querySelector(".ins-cls").textContent = target.classList[0] ? "." + target.classList[0] : "";
  label.querySelector(".ins-dim").textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;

  const lh = label.offsetHeight;
  const above = r.top - m.t - lh - 6;
  const y = above > 70 ? above : r.bottom + m.b + 6;
  const x = Math.min(Math.max(8, r.left), innerWidth - label.offsetWidth - 8);
  label.style.left = x + "px";
  label.style.top = y + "px";
}

let frame = 0;
let glideTimer = 0;
const redraw = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(draw);
};

if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.addEventListener("mouseover", (e) => {
    const next = e.target.closest("[data-inspect]") || home;
    if (next !== target) {
      target = next;
      inspector.classList.add("glide");
      clearTimeout(glideTimer);
      glideTimer = setTimeout(() => inspector.classList.remove("glide"), 200);
      redraw();
    }
  });
}
addEventListener("scroll", redraw, { passive: true });
addEventListener("resize", redraw);
document.fonts?.ready.then(redraw);
redraw();
