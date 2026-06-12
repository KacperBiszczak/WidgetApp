import type { IDashboardWidgetConfig } from "../../dashboardWidgets/IDashboardWidgetConfig";

export interface BackendDashboardConfigDto {
    version: number;
    widgets: BackendDashboardWidgetDto[];
}

export interface BackendDashboardWidgetDto {
    id: string;
    config: IDashboardWidgetConfig;
}