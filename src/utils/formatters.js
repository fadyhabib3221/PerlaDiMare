const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const monthKey = (dateStr) => (dateStr ? dateStr.slice(0, 7) : "No date");

export const rankByServiceDate = (list, dateKey) => {
  const hasDate = (row) => !!row[dateKey];
  const byDateAsc = [...list].sort((a, b) => {
    if (!hasDate(a) && !hasDate(b)) return 0;
    if (!hasDate(a)) return 1;
    if (!hasDate(b)) return -1;
    return a[dateKey].localeCompare(b[dateKey]);
  });
  const rnByRowId = {};
  byDateAsc.forEach((row, i) => {
    rnByRowId[row.id] = i + 1;
  });
  const sorted = [...list].sort((a, b) => {
    if (!hasDate(a) && !hasDate(b)) return 0;
    if (!hasDate(a)) return 1;
    if (!hasDate(b)) return -1;
    return b[dateKey].localeCompare(a[dateKey]);
  });
  return { sorted, rnByRowId };
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  const monthAbbr = (MONTHS[parseInt(m, 10) - 1] || m).slice(0, 3).toUpperCase();
  return `${d}-${monthAbbr}-${y}`;
};

export const monthLabel = (key) => {
  if (key === "No date") return key;
  const [y, m] = key.split("-");
  const idx = parseInt(m, 10) - 1;
  return `${MONTHS[idx] || m} ${y}`;
};

export const formatDisplayDateFull = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  const monthFull = (MONTHS[parseInt(m, 10) - 1] || m).toUpperCase();
  return `${d}-${monthFull}-${y}`;
};

export const employeeInitials = (name) => {
  if (!name) return "-";
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase();
  return initials || "-";
};

export const formatDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const monthAbbr = MONTHS[d.getMonth()].slice(0, 3).toUpperCase();
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}-${monthAbbr}-${yyyy} ${hh}:${min}`;
};

export const addCentsOnBlur = (value) => {
  if (value === "" || value === null || value === undefined) return value;
  const str = String(value);
  if (str.includes(".")) return str;
  const num = parseFloat(str);
  if (isNaN(num)) return str;
  return num.toFixed(2);
};