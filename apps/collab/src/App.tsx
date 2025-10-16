import React from "react";
import { Page } from "@pulsegrid/ui";
import Room from "./components/Room";

export default function App() {
  return (
    <Page title="Collaboration">
      <p>Auth-gated (token not enforced client-side for demo). Live comments & presence.</p>
      <Room />
    </Page>
  );
}
