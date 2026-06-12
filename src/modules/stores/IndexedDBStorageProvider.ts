import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";
import type { IWidgetStorageProvider } from "./IWidgetStorageProvider";
import { widgetDashboardDb } from "./WidgetDashboardDatabase";

export class IndexedDBStorageProvider implements IWidgetStorageProvider {
    async loadWidgets(): Promise<IDashboardWidgetConfig[]> {
        return await widgetDashboardDb.widgets
        .orderBy("order")
        .toArray();
    }

    async createWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        await widgetDashboardDb.widgets.put(widget);
        return widget;
    }

    async updateWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        await widgetDashboardDb.widgets.put(widget);
        return widget;
    }

    async saveWidgets(widgets: IDashboardWidgetConfig[]): Promise<IDashboardWidgetConfig[]> {
        await widgetDashboardDb.widgets.clear();
        await widgetDashboardDb.widgets.bulkPut(widgets);
        return widgets;
    }

    async deleteWidget(id: string): Promise<void> {
        await widgetDashboardDb.widgets.delete(id);
    }
}