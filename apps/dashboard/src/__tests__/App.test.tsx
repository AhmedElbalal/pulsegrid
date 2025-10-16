import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";

vi.mock("../lib/socket", () => {
  return {
    streamSocket: {
      on: (event: string, cb: (s: any) => void) => {
        if (event === "summary") {
          cb({
            eventsPerMin: 12,
            activeUsers5m: 3,
            topTypes: [{ type: "click", count: 7 }, { type: "view", count: 5 }],
            series: [{ t: Date.now(), count: 12 }]
          });
        }
      },
      off: () => {}
    }
  };
});

test("renders KPIs from first socket payload", async () => {
  render(<App />);
  expect(await screen.findByText(/Events\/min/i)).toBeTruthy();
  expect(screen.getByText("12")).toBeTruthy();
});
