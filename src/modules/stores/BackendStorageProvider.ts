import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";
import type { IWidgetStorageProvider } from "./IWidgetStorageProvider";

export class BackendStorageProvider implements IWidgetStorageProvider {
    async loadWidgets(): Promise<IDashboardWidgetConfig[]> {
        console.log("Backend loadWidgets");
        return [];
    }

    async createWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        console.log("Backend createWidget", widget);
        return widget;
    }

    async updateWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        console.log("Backend updateWidget", widget);
        return widget;
    }

    async saveWidgets(widgets: IDashboardWidgetConfig[]): Promise<IDashboardWidgetConfig[]> {
        console.log("Backend saveWidgets", widgets);
        return widgets;
    }

    async deleteWidget(id: string): Promise<void> {
        console.log("Backend deleteWidget", id);
    }
}