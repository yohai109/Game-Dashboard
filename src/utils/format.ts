export interface FormattedTime {
  h: string;
  m: string;
  s: string;
  ampm?: string;
}

export const formatTime = (date: Date): FormattedTime => ({
  h: String(date.getHours()).padStart(2, "0"),
  m: String(date.getMinutes()).padStart(2, "0"),
  s: String(date.getSeconds()).padStart(2, "0"),
  // No need for ampm in 24h format
});

export const formatDate = (date: Date): string => {
  const day = date.toLocaleDateString(undefined, { weekday: "long" });
  const d = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();
  return `${day}, ${month} ${d}, ${year}`;
};
