export function toCsv<T extends Record<string, unknown>>(rows: T[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) =>
    typeof v === "string" && (v.includes(",") || v.includes("\n") || v.includes("\""))
      ? `"` + String(v).replaceAll('"', '""') + `"`
      : String(v ?? "");
  const lines = [headers.join(",")];
  for (const r of rows) lines.push(headers.map((h) => esc((r as any)[h])).join(","));
  return lines.join("\n");
}
