import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";
import type { IWidgetStorageProvider } from "./IWidgetStorageProvider";

export class LocalStorageProvider implements IWidgetStorageProvider {
    private readonly key = "widgets";

    async loadWidgets(): Promise<IDashboardWidgetConfig[]> {
        const rawWidgets = localStorage.getItem(this.key);
        return rawWidgets ? JSON.parse(rawWidgets) : [];
    }

    async saveWidgets(widgets: IDashboardWidgetConfig[]): Promise<IDashboardWidgetConfig[]> {
        localStorage.setItem(this.key, JSON.stringify(widgets));
        return widgets;
    }

    async createWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        const widgets = await this.loadWidgets();
        widgets.push(widget);
        await this.saveWidgets(widgets);
        return widget;
    }

    async updateWidget(widget: IDashboardWidgetConfig): Promise<IDashboardWidgetConfig> {
        const widgets = await this.loadWidgets();

        const updatedWidgets = widgets.map((w) =>
            w.id === widget.id ? widget : w
        );

        await this.saveWidgets(updatedWidgets);
        return widget;
    }

    async deleteWidget(id: string): Promise<void> {
        const widgets = await this.loadWidgets();
        const filteredWidgets = widgets.filter((w) => w.id !== id);
        await this.saveWidgets(filteredWidgets);
    }
}