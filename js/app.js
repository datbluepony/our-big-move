// ===== progress bar =====
const bar = document.getElementById("progress");
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
}, { passive: true });

// ===== reveal on scroll =====
const instant = location.hash || matchMedia("(prefers-reduced-motion: reduce)").matches;
if (instant) {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("on"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

// ===== nav dots highlight =====
const dotLinks = [...document.querySelectorAll("#dots a")];
const sections = dotLinks.map(a => document.querySelector(a.getAttribute("href")));
const so = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const i = sections.indexOf(e.target);
      dotLinks.forEach((d, j) => d.classList.toggle("on", i === j));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => s && so.observe(s));

// ===== floor plan room tap =====
const label = document.getElementById("roomlabel");
document.querySelectorAll("#floorplan .room").forEach(r => {
  r.addEventListener("click", () => {
    const was = r.classList.contains("active");
    document.querySelectorAll("#floorplan .room").forEach(x => x.classList.remove("active"));
    if (!was) {
      r.classList.add("active");
      if (label) { label.textContent = r.dataset.name; label.classList.add("show"); }
    } else if (label) { label.classList.remove("show"); }
  });
});

// ===== premium menu overlay =====
const menuBtn = document.getElementById("menu-btn");
const overlay = document.getElementById("menu-overlay");
function closeMenu() { overlay.classList.remove("open"); menuBtn.classList.remove("open"); document.body.style.overflow = ""; }
menuBtn.addEventListener("click", () => {
  const open = overlay.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});
overlay.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

// ===== header shows after hero =====
const header = document.getElementById("topbar");
addEventListener("scroll", () => {
  header.classList.toggle("scrolled", scrollY > 40);
}, { passive: true });
