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

// =============================================================================
// NEW DASHBOARD TYPES - Added for enhanced components
// =============================================================================

// Dashboard Metrics & Analytics Types
export interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'increase' | 'decrease';
  format?: 'currency' | 'percentage' | 'number' | 'duration';
  subtitle?: string;
  icon?: string;
}

export interface TimeframeOption {
  value: string;
  label: string;
  days: number;
}

export interface AIInsight {
  type: 'optimization' | 'warning' | 'opportunity' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action?: string;
}

export interface TrendData {
  value: number;
  period: string;
  direction: 'up' | 'down';
}

// Navigation & Layout Types
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge: string | null;
  path?: string;
  children?: MenuItem[];
}

export interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

// Component-Specific Prop Types
export interface DataCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  trend: TrendData;
  onAnalyze?: () => Promise<void>;
  isLoading?: boolean;
}

export interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }>;
  timeframe?: string;
}

// Enhanced Chart Types
export interface EnhancedChartPoint extends ChartPoint {
  predictive?: boolean;
  confidence?: number;
}

export interface EnhancedChartSeries extends ChartSeries {
  predictiveData?: EnhancedChartPoint[];
  insights?: AIInsight[];
}

// Real-time Data Types
export interface RealTimeConfig {
  endpoint: string;
  interval?: number;
  autoConnect?: boolean;
}

export interface WebSocketMessage {
  type: 'metrics' | 'events' | 'insights' | 'error';
  payload: any;
  timestamp: Date;
}

// Dashboard State Management
export interface DashboardState {
  timeframe: string;
  isLoading: boolean;
  activeView: string;
  selectedMetrics: string[];
  filters: Record<string, any>;
  realTimeEnabled: boolean;
}

// AI & Analytics Types
export interface AnalysisRequest {
  metricId: string;
  timeframe: string;
  data: any;
}

export interface AnalysisResponse {
  insights: AIInsight[];
  predictions?: EnhancedChartPoint[];
  recommendations: string[];
  confidence: number;
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

// NEW UTILITY FUNCTIONS - For enhanced dashboard
export function createTrendData(value: number, period: string): TrendData {
  return {
    value: Math.abs(value),
    period,
    direction: value >= 0 ? 'up' : 'down'
  };
}

export function formatMetricValue(value: number, format?: string): string {
  switch (format) {
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'percentage':
      return `${value}%`;
    case 'duration':
      return `${Math.floor(value / 60)}m ${value % 60}s`;
    default:
      return value.toLocaleString();
  }
}

export function generateAIInsights(metrics: DashboardMetric[]): AIInsight[] {
  return metrics.map(metric => ({
    type: metric.changeType === 'increase' ? 'optimization' : 'warning',
    title: `${metric.title} ${metric.changeType === 'increase' ? 'Growth' : 'Decline'}`,
    description: `Your ${metric.title.toLowerCase()} shows a ${Math.abs(metric.change)}% ${metric.changeType} compared to previous period.`,
    impact: Math.abs(metric.change) > 10 ? 'high' : Math.abs(metric.change) > 5 ? 'medium' : 'low',
    confidence: Math.min(95, 70 + Math.abs(metric.change)),
    action: metric.changeType === 'increase'
      ? 'Consider scaling this successful initiative'
      : 'Review strategies to improve this metric'
  }));
}