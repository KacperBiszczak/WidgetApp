// import type { DashboardWidgetInterface } from "./DashboardWidgetInterface";

export const WidgetType = {
    DigitalClock: "clock",
    Weather: "weather",
    News: "news",
    Quote: "quote",
} as const;

export type WidgetType =
    (typeof WidgetType)[keyof typeof WidgetType];

export interface IDashboardWidgetConfig {
    title: string;
    refreshInterval: number;
    type: WidgetType;
    // opcjonalne potrzebne parametry
}