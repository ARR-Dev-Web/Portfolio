document.getElementById("y").textContent = new Date().getFullYear();
const sections = [
  "inicio",
  "sobre-mi",
  "servicios",
  "skill",
  "portfolio",
  "contacto",
];
const links = Array.from(document.querySelectorAll(".nav-link"));
const opts = {
  root: null,
  rootMargin: "0px 0px -60% 0px",
  threshold: 0.2,
};
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((a) => a.classList.remove("active"));
      const target = links.find(
        (a) => a.getAttribute("href") === "#" + e.target.id
      );
      target && target.classList.add("active");
    }
  });
}, opts);
sections.forEach((id) => io.observe(document.getElementById(id)));

const grid = document.getElementById("grid");
document.getElementById("filters").addEventListener("click", (ev) => {
  const btn = ev.target.closest("button[data-filter]");
  if (!btn) return;
  const f = btn.dataset.filter;
  grid.querySelectorAll(".work").forEach((card) => {
    const show = f === "all" || card.dataset.cat === f;
    card.style.display = show ? "" : "none";
  });
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  alert(
    `¡Gracias, ${data.nombre}! Me pondré en contacto a ${data.email}.`
  );
  e.target.reset();
});

document.querySelectorAll(".card__media img").forEach((img) => {
  img.addEventListener("error", () => {
    const figure = img.closest(".card__media");
    img.remove();
    const fallback = document.createElement("div");
    fallback.setAttribute("aria-hidden", "true");
    fallback.style.cssText = `width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#12161b,#0b0e0b);color:#d1d5db;font-size:14px;`;
    fallback.innerHTML = "<span>Captura no disponible</span>";
    figure.prepend(fallback);
  });
});