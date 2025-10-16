import React from "react";
import { Page } from "@pulsegrid/ui";
import ReportForm from "./components/ReportForm";

export default function App() {
  return (
    <Page title="Reports">
      <p>Run aggregate queries & export CSV.</p>
      <ReportForm />
    </Page>
  );
}
