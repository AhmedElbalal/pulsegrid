import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Page, Button } from "@pulsegrid/ui";
import { Dashboard, Reports, Collab } from "./routes";

export default function App() {
  return (
    <Page title="PulseGrid • Shell">
      <nav style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Link to="/"><Button>Home</Button></Link>
        <Link to="/dashboard"><Button>Dashboard</Button></Link>
        <Link to="/reports"><Button>Reports</Button></Link>
        <Link to="/collab"><Button>Collab</Button></Link>
      </nav>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<div>Welcome to PulseGrid.</div>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/collab" element={<Collab />} />
        </Routes>
      </Suspense>
    </Page>
  );
}
