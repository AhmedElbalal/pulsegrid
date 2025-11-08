export interface EventInput {
    type: string;
    userId: string;
    timestamp?: Date | string | number;
    metadata?: Record<string, any>;
}
export interface LegacyEventInput {
    type: string;
    userId: string;
    ts?: string | number;
    props?: Record<string, any>;
}
export interface MetricsPayload {
    activeUsers: number;
    topEventTypes: Array<{
        type: string;
        _count: {
            type: number;
        };
    }>;
}
export interface StreamSummary {
    activeUsers: number;
    topEventTypes: Array<{
        type: string;
        _count: {
            type: number;
        };
    }>;
    series?: Array<{
        timestamp: Date;
        value: number;
    }>;
}
export interface SimplifiedMetrics {
    activeUsers: number;
    topEventTypes: Array<{
        type: string;
        count: number;
    }>;
}
export interface User {
    id: string;
    email: string;
    name?: string;
}
export interface ApiResponse<T> {
    ok: boolean;
    data?: T;
    error?: string;
}
export interface ReportInput {
    title: string;
    eventType?: string;
    userId: string;
}
export interface ChartPoint {
    timestamp: Date;
    value: number;
}
export interface ChartSeries {
    label: string;
    data: ChartPoint[];
    color?: string;
}
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
export interface EnhancedChartPoint extends ChartPoint {
    predictive?: boolean;
    confidence?: number;
}
export interface EnhancedChartSeries extends ChartSeries {
    predictiveData?: EnhancedChartPoint[];
    insights?: AIInsight[];
}
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
export interface DashboardState {
    timeframe: string;
    isLoading: boolean;
    activeView: string;
    selectedMetrics: string[];
    filters: Record<string, any>;
    realTimeEnabled: boolean;
}
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
export declare function simplifyMetrics(data: MetricsPayload): SimplifiedMetrics;
export declare function createTrendData(value: number, period: string): TrendData;
export declare function formatMetricValue(value: number, format?: string): string;
export declare function generateAIInsights(metrics: DashboardMetric[]): AIInsight[];
