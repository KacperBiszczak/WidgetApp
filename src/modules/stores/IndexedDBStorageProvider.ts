import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";
import type { IWidgetStorageProvider } from "./IWidgetStorageProvider";

export class IndexedDBStorageProvider implements IWidgetStorageProvider {
    async loadWidgets(): Promise<IDashboardWidgetConfig[]> {
        console.log("IndexedDB loadWidgets");
        return [];
    }

    async createWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        console.log("IndexedDB createWidget", widget);
        return widget;
    }

    async updateWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        console.log("IndexedDB updateWidget", widget);
        return widget;
    }

    async saveWidgets(widgets: IDashboardWidgetConfig[]): Promise<IDashboardWidgetConfig[]> {
        console.log("IndexedDB saveWidgets", widgets);
        return widgets;
    }

    async deleteWidget(id: string): Promise<void> {
        console.log("IndexedDB deleteWidget", id);
    }
}