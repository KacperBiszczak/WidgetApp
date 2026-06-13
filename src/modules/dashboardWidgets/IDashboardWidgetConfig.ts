import type { NewsCategory } from "./news/NewsApiTypes";
    
export type ClockFormat = "HH:MM:SS" | "HH:MM";

export type QuoteProviderType = "quotable" | "dummy";

export const WidgetType = {
    DigitalClock: "clock",
    Weather: "weather",
    News: "news",
    Quote: "quote",
} as const;


export type WidgetType =
    (typeof WidgetType)[keyof typeof WidgetType];

export interface IDashboardWidgetConfig {
    id: string;
    title: string;
    refreshInterval: number;
    type: WidgetType;

    order: number;

    // opcjonalne potrzebne parametry
    clockFormat?: ClockFormat;
    city? :string;

    newsCategory?: NewsCategory;
    newsCountry?: string;

    quoteProvider?: string;
}