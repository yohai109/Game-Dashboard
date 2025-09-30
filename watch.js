function formatTime(date) {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return { h, m, s };
}
function formatDate(date) {
  const day = date.toLocaleDateString(undefined, { weekday: "long" });
  const d = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();
  return `${day}, ${month} ${d}, ${year}`;
}
function updateWatch() {
  const now = new Date();
  const { h, m, s } = formatTime(now);
  const watch = document.getElementById("watch");
  const dateEl = document.getElementById("date");
  if (watch) watch.textContent = `${h}:${m}:${s}`;
  if (dateEl) dateEl.textContent = formatDate(now);
}
function startPreciseTicker() {
  function tick() {
    updateWatch();
    const now = Date.now();
    const delay = 1000 - (now % 1000);
    setTimeout(tick, delay);
  }
  tick();
}
window.addEventListener("DOMContentLoaded", startPreciseTicker);
