// shared/utils/src/index.ts

/**
 * Converts an array of objects to CSV text.
 * Handles commas, quotes, and newlines safely.
 */
export function toCsv(data: Record<string, any>[]): string {
    if (!data.length) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    for (const row of data) {
        const values = headers.map(header => {
            const val = row[header];
            const safe = String(val ?? "").replace(/"/g, '""');
            return `"${safe}"`;
        });
        csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
}

/** Example small utility functions */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US").format(value);
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
