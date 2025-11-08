"use strict";
// shared/types/src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyMetrics = simplifyMetrics;
exports.createTrendData = createTrendData;
exports.formatMetricValue = formatMetricValue;
exports.generateAIInsights = generateAIInsights;
// Utility function type to transform data
function simplifyMetrics(data) {
    return {
        activeUsers: data.activeUsers,
        topEventTypes: data.topEventTypes.map(item => ({
            type: item.type,
            count: item._count.type
        }))
    };
}
// NEW UTILITY FUNCTIONS - For enhanced dashboard
function createTrendData(value, period) {
    return {
        value: Math.abs(value),
        period,
        direction: value >= 0 ? 'up' : 'down'
    };
}
function formatMetricValue(value, format) {
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
function generateAIInsights(metrics) {
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
