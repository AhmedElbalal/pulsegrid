// shared/types/src/index.ts

// Event types - UPDATED to match your Prisma schema
export interface EventInput {
  type: string;
  userId: string;
  timestamp?: Date | string | number;
  metadata?: Record<string, any>;
}

// Keep the old interface for backward compatibility if needed
export interface LegacyEventInput {
  type: string;
  userId: string;
  ts?: string | number;
  props?: Record<string, any>;
}

// Metrics types - UPDATED to match Prisma groupBy output
export interface MetricsPayload {
  activeUsers: number;
  topEventTypes: Array<{
    type: string;
    _count: { type: number }; // Prisma groupBy format
  }>;
}

// Stream types - UPDATED to match Prisma groupBy output
export interface StreamSummary {
  activeUsers: number;
  topEventTypes: Array<{
    type: string;
    _count: { type: number }; // Prisma groupBy format
  }>;
  series?: Array<{
    timestamp: Date;
    value: number;
  }>;
}

// Simplified version for components that need count directly
export interface SimplifiedMetrics {
  activeUsers: number;
  topEventTypes: Array<{
    type: string;
    count: number;
  }>;
}

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
}

// API Response types
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

// Report types
export interface ReportInput {
  title: string;
  eventType?: string;
  userId: string;
}

// Chart data types
export interface ChartPoint {
  timestamp: Date;
  value: number;
}

export interface ChartSeries {
  label: string;
  data: ChartPoint[];
  color?: string;
}

// Utility function type to transform data
export function simplifyMetrics(data: MetricsPayload): SimplifiedMetrics {
  return {
    activeUsers: data.activeUsers,
    topEventTypes: data.topEventTypes.map(item => ({
      type: item.type,
      count: item._count.type
    }))
  };
}