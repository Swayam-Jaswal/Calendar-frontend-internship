export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SHORT_MONTHS = MONTHS.map((month) => month.slice(0, 3));

const pad = (value) => String(value).padStart(2, "0");

export function dateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function monthKey(year, month) {
  return `${year}-${pad(month + 1)}`;
}

export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return `${SHORT_MONTHS[month - 1]} ${day}, ${year}`;
}

export function formatRange(start, end) {
  if (!start) return "No range selected";
  if (!end || start === end) return formatDate(start);
  return start < end
    ? `${formatDate(start)} to ${formatDate(end)}`
    : `${formatDate(end)} to ${formatDate(start)}`;
}

export function normalizeRange(start, end) {
  if (!start) return { start: null, end: null };
  if (!end || start === end) return { start, end: start };
  return start < end ? { start, end } : { start: end, end: start };
}

export function getMonthMeta(year, month) {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return { totalDays, offset };
}
