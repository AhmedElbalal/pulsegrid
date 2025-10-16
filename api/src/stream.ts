export function startSummarizer(io: SocketIOServer): void {
  console.log("⚙️  Summarizer started...");

  setInterval(async () => {
    try {
      const activeUsers = await prisma.event.findMany({
        select: { userId: true },
        distinct: ["userId"],
      });

      const topEventTypes = await prisma.event.groupBy({
        by: ["type"],
        _count: { type: true },
        orderBy: {
          _count: { type: "desc" },
        },
        take: 3,
      });

      // IMPROVED SERIES DATA GENERATION
      // Get events from the last 10 minutes for better data
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const recentEvents = await prisma.event.findMany({
        where: {
          timestamp: {
            gte: tenMinutesAgo
          }
        },
        orderBy: {
          timestamp: 'asc'
        },
        take: 100 // Limit to recent events
      });

      console.log(`📊 Found ${recentEvents.length} recent events for series data`);

      let series = [];

      if (recentEvents.length > 0) {
        // Generate time series data (group by 30-second intervals)
        const timeSeries: { [key: string]: number } = {};

        recentEvents.forEach(event => {
          // Group by 30-second intervals
          const eventTime = new Date(event.timestamp).getTime();
          const intervalKey = Math.floor(eventTime / 30000) * 30000; // 30-second intervals

          timeSeries[intervalKey] = (timeSeries[intervalKey] || 0) + 1;
        });

        // Convert to array format for the chart
        series = Object.entries(timeSeries).map(([timestamp, count]) => ({
          ts: parseInt(timestamp), // Convert back to number
          count: count
        }));

        // Sort by timestamp
        series.sort((a, b) => a.ts - b.ts);
      } else {
        // If no recent events, generate sample data for demo
        console.log("📈 Generating sample series data for demo");
        const now = Date.now();
        series = Array.from({ length: 10 }, (_, i) => ({
          ts: now - (10 - i) * 10000, // Last 100 seconds
          count: Math.floor(Math.random() * 5) + 1 // Random counts 1-5
        }));
      }

      const summary = {
        activeUsers: activeUsers.length,
        topEventTypes,
        series
      };

      io.of("/stream").emit("summary", summary);
      console.log("📡 Broadcast summary:", {
        activeUsers: summary.activeUsers,
        topEventTypes: summary.topEventTypes.map(t => ({ type: t.type, count: t._count.type })),
        seriesLength: summary.series.length,
        seriesSample: summary.series.slice(0, 3)
      });
    } catch (err) {
      console.error("❌ Summarizer tick error:", err);
    }
  }, 10000);
}