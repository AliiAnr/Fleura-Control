export function formatRupiah(value: number | string): string {
  const num = typeof value === "string" ? parseInt(value, 10) : value;
  return `Rp ${num.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}