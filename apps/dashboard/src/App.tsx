import React, { useState, useEffect } from "react";
import { Page } from "@pulsegrid/ui";
import type { StreamSummary } from "@pulsegrid/types";
import { streamSocket } from "./lib/socket";
import { Kpis } from "./components/Kpis";
import RealtimeChart from "./components/RealtimeChart";

export default function App() {
  const [summary, setSummary] = useState<StreamSummary>();

  useEffect(() => {
    const handler = (s: StreamSummary) => {
      console.log("📊 Received WebSocket data:", {
        activeUsers: s.activeUsers,
        topEventTypes: s.topEventTypes,
        seriesLength: s.series?.length || 0,
      });
      setSummary(s);
    };

    streamSocket.on("summary", handler);

    return () => {
      streamSocket.off("summary", handler);
    };
  }, []);

  return (
    <Page
      title="PulseGrid Dashboard"
      subtitle="Real-time analytics dashboard powered by @pulsegrid/ui"
    >
      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
        alignItems: 'start'
      }}>

        {/* Left Column - KPIs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <Kpis data={summary} />
          </div>

          {/* Additional Metrics Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{
              color: '#38bdf8',
              marginBottom: '16px',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              System Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>WebSocket</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>Connected</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Data Updates</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>Real-time</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Last Update</span>
                <span style={{ color: '#e2e8f0', fontWeight: '600' }}>
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Chart */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #374151',
          minHeight: '400px'
        }}>
          <RealtimeChart points={summary?.series ?? []} />
        </div>

      </div>
    </Page>
  );
}