import type { IWidgetStorageProvider } from "../stores/IWidgetStorageProvider";
import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import { WidgetType } from "./IDashboardWidgetConfig";
import { DigitalClockWidget } from "./DigitalClockWidget";
import { DashboardWidget } from "./DashboardWidget";

export class Dashboard {
    protected dashboardEl: HTMLElement = document.createElement("div");
    private widgets: DashboardWidget[] = [];
    private storageProvider: IWidgetStorageProvider;

    constructor(storageProvider: IWidgetStorageProvider) {
        this.storageProvider = storageProvider;
    }

    mount = async (target: HTMLElement) => {
        this.dashboardEl = document.createElement("div");
        this.dashboardEl.classList.add("widgetContainer");

        // Nasłuchiwanie eventów z dashboardWidget
        this.dashboardEl.addEventListener("deleteWidget", async (event: Event) => {
            const customEvent = event as CustomEvent;

            await this.deleteWidget(customEvent.detail.id);
        });

        this.dashboardEl.addEventListener("configUpdated", async (event: Event) => {
            const customEvent = event as CustomEvent<IDashboardWidgetConfig>;

            await this.storageProvider.updateWidget(customEvent.detail);
        });

        target.appendChild(this.dashboardEl);

        const savedWidgets = await this.storageProvider.loadWidgets();

        savedWidgets.forEach((config) => {
            this.renderWidget(config);
        });
    };

    createWidget = async (config: Omit<IDashboardWidgetConfig, "id">) => {
        const widgetConfig: IDashboardWidgetConfig = {
            ...config,
            id: crypto.randomUUID(),
        };

        await this.storageProvider.createWidget(widgetConfig);
        this.renderWidget(widgetConfig);
    };

    private renderWidget = (config: IDashboardWidgetConfig) => {
        let widget: DashboardWidget;

        switch (config.type) {
            case WidgetType.DigitalClock:
                widget = new DigitalClockWidget(config);
                break;

            default:
                throw new Error("Zły typ widgetu.");
        }

        widget.mount(this.dashboardEl, config);
        this.widgets.push(widget);
    };

    deleteWidget = async (id: string) => {

        const widget = this.widgets.find(
            w => w.getId() === id
        );

        if (!widget) {
            return;
        }

        await widget.unmount();

        this.widgets = this.widgets.filter(
            w => w.getId() !== id
        );

        await this.storageProvider.deleteWidget(id);

        console.log(`Usunięto widget ${id}`);
    }

    updateWidget = async (id: string, config: Partial<IDashboardWidgetConfig>) => {
        const widget = this.widgets.find((w) => w.getConfig().id === id);
        if (!widget) return;

        const updatedConfig = {
            ...widget.getConfig(),
            ...config,
        };

        widget.setConfig(updatedConfig);
        await this.storageProvider.updateWidget(updatedConfig);
    };
}