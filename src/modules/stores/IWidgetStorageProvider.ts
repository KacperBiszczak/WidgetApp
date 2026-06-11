// import { DashboardWidget } from "../dashboardWidgets/DashboardWidget";
import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";

export interface IWidgetStorageProvider {
  loadWidgets: () => Promise<IDashboardWidgetConfig[]>;
  updateWidget: (widget: IDashboardWidgetConfig) => Promise<IDashboardWidgetConfig>;
  createWidget: (widget: IDashboardWidgetConfig) => Promise<IDashboardWidgetConfig>;
  saveWidgets: (widget: IDashboardWidgetConfig[]) => Promise<IDashboardWidgetConfig[]>;
  deleteWidget: (id: string) => Promise<void>;
}