import React from 'react';

interface RealtimeChartProps { points: any[]; }

const RealtimeChart: React.FC<RealtimeChartProps> = ({ points }) => {
  const hasData = Array.isArray(points) && points.length > 0;
  return (
    <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Real-time Events</h3>
      <div className="h-64 bg-slate-900 rounded border border-slate-700 flex items-center justify-center">
        {hasData ? (
          <div className="text-center">
            <p className="text-slate-300 mb-2">Displaying {points.length} data points</p>
            <p className="text-slate-500 text-sm">Chart visualization mounts here</p>
          </div>
        ) : (
          <p className="text-slate-500">No real-time data available</p>
        )}
      </div>
    </section>
  );
};
export default RealtimeChart;
