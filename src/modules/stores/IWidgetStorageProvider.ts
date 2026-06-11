import { DashboardWidget } from "../dashboardWidgets/DashboardWidget";

export interface IWidgetStorageProvider {
  loadWidgets: () => Promise<DashboardWidget[]>;
  updateWidget: (widget: DashboardWidget) => Promise<DashboardWidget>;
  createWidget: (widget: DashboardWidget) => Promise<DashboardWidget>;
  saveWidgets: (widget: DashboardWidget[]) => Promise<DashboardWidget[]>;
  deleteWidget: (id: string) => Promise<void>;
}