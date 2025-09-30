export function formatTime(date) {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return { h, m, s };
}

export function formatDate(date) {
  const day = date.toLocaleDateString(undefined, { weekday: "long" });
  const d = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();
  return `${day}, ${month} ${d}, ${year}`;
}
