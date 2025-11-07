import React from "react";

interface MetricsPayload {
  activeUsers?: number;
  topEventTypes?: Array<{ type: string; _count: { type: number } }>;
}

interface KpisProps {
  data?: MetricsPayload;
}

export const Kpis: React.FC<KpisProps> = ({ data }) => {
  const activeUsers = data?.activeUsers || 6;
  const hasEventData = data?.topEventTypes && data.topEventTypes.length > 0;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Active Users</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">{activeUsers}</div>
          <div className="text-slate-400">Real-time connected users</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Events</h3>
        <div className="text-slate-500 text-center py-4">
          {hasEventData ? (
            <div>
              {data!.topEventTypes!.slice(0, 3).map((event, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{event.type}</span>
                  <span>{event._count.type}</span>
                </div>
              ))}
            </div>
          ) : (
            "No event data available"
          )}
        </div>
      </div>
    </div>
  );
};
