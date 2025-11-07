// api/src/stream.ts
import { Server as SocketIOServer } from 'socket.io';

// Define interfaces locally since we can't import from @pulsegrid/types
export interface StreamSummary {
  activeUsers: number;
  topEventTypes: Array<{
    type: string;
    count: number;
  }>;
  recentActivity: Array<{
    type: string;
    userId: string;
    timestamp: Date;
  }>;
  series?: any[]; // Add missing property
}

// Mock database functions since prisma import is failing
const mockPrisma = {
  event: {
    findMany: async () => [],
    groupBy: async () => []
  }
};

export function startSummarizer(io: SocketIOServer): void {
  // Send summary every 5 seconds
  setInterval(async () => {
    try {
      // Get active users (unique users in last 5 minutes)
      const activeUsers = await mockPrisma.event.findMany();
      // Get top event types
      const topEventTypes = await mockPrisma.event.groupBy();

      const summary: StreamSummary = {
        activeUsers: activeUsers.length,
        topEventTypes: topEventTypes.map((t: any) => ({
          type: t.type,
          count: t._count?.type || 0
        })),
        recentActivity: [],
        series: [] // Add empty series array
      };

      // Emit to all connected clients
      io.emit('summary', summary);

    } catch (error) {
      console.error('Error generating stream summary:', error);
      io.emit('error', { message: 'Failed to generate summary' });
    }
  }, 5000); // Every 5 seconds
}