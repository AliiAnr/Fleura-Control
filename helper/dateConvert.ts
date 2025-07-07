export function formatTanggalIndoFromDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) return "-";
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}