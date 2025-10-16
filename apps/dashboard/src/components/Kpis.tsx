import React from "react";
import type { MetricsPayload } from "@pulsegrid/types";

interface KpisProps {
  data?: MetricsPayload;
}

export const Kpis: React.FC<KpisProps> = ({ data }) => {
  if (!data) {
    return (
      <div style={{
        textAlign: 'center',
        color: '#94a3b8',
        padding: '40px 0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
        <p>Waiting for real-time metrics...</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '32px',
      alignItems: 'start'
    }}>
      {/* Active Users Card */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(6, 182, 212, 0.3)'
        }}>
          {data.activeUsers}
        </div>
        <h3 style={{
          color: '#38bdf8',
          marginBottom: '8px',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          Active Users
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Real-time connected users
        </p>
      </div>

      {/* Top Events Card */}
      <div>
        <h3 style={{
          color: '#38bdf8',
          marginBottom: '20px',
          fontSize: '1.25rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          🔥 Top Events
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.topEventTypes.map((t, index) => (
            <div key={t.type} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '8px',
              border: '1px solid #374151',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: `hsl(${index * 60}, 70%, 50%)`,
                  boxShadow: `0 0 8px hsl(${index * 60}, 70%, 50%)`
                }}></div>
                <span style={{
                  color: '#e2e8f0',
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  fontSize: '0.95rem'
                }}>
                  {t.type}
                </span>
              </div>
              <span style={{
                color: '#38bdf8',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                background: 'rgba(56, 189, 248, 0.1)',
                padding: '4px 12px',
                borderRadius: '6px'
              }}>
                {t._count.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};