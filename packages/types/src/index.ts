// packages/types/src/index.ts

// Event types for API
export interface EventInput {
  type: string;
  userId: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
   ts?: string | number; // Add this
  props?: Record<string, any>;
}

// Stream/WebSocket types
export interface StreamSummary {
  activeUsers: number;
  topEventTypes: Array<{
    type: string;
    count: number;
  }>;
  series?: Array<{
    timestamp: Date;
    value: number;
  }>;
}

// Metrics types for dashboard
export interface MetricsPayload {
  activeUsers: number;
  topEventTypes: Array<{
    type: string;
    count: number;
  }>;
}

// Report types
export interface ReportInput {
  title: string;
  eventType: string;
  // Add other report fields as needed
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
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