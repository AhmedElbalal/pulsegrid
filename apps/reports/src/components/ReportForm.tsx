import React, { useState } from "react";
import { Button } from "@pulsegrid/ui";
import { toCsv } from "@pulsegrid/utils";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ReportForm() {
  const [token, setToken] = useState("");
  const [eventType, setEventType] = useState("view");
  const [from, setFrom] = useState(new Date(Date.now() - 3600_000).toISOString());
  const [to, setTo] = useState(new Date().toISOString());
  const [rows, setRows] = useState<any[]>([]);

  const run = async () => {
    const res = await fetch(`${API}/api/reports?eventType=${eventType}&from=${from}&to=${to}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRows(data);
  };

  const exportCsv = () => {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input placeholder="Bearer token" value={token} onChange={(e) => setToken(e.target.value)} />
      <input placeholder="event type" value={eventType} onChange={(e) => setEventType(e.target.value)} />
      <input value={from} onChange={(e) => setFrom(e.target.value)} />
      <input value={to} onChange={(e) => setTo(e.target.value)} />
      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={run}>Run</Button>
        <Button onClick={exportCsv}>Export CSV</Button>
      </div>
      <table>
        <thead><tr><th>type</th><th>count</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}><td>{r.type}</td><td>{r.count}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
