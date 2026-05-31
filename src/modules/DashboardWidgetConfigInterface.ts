// import type { DashboardWidgetInterface } from "./DashboardWidgetInterface";

export const widgetType = {
    digitalClockWidget: "clock",
    whetherWidget: "whether",
    newsWidget: "news",
    quoteWidget: "quote"
} as const;

type widgetType = (typeof widgetType)[keyof typeof widgetType];

export interface DashboardWidgetConfig {
    title: string;
    refreshInterval: number;
    type?: widgetType;
}