import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import type { IDashboardWidget } from "./IDashboardWidget";

export abstract class DashboardWidget implements IDashboardWidget<IDashboardWidgetConfig> {
    private static storedWidgets: IDashboardWidgetConfig[] = [];
    
    protected widgetEl: HTMLElement | undefined;
    protected target: HTMLElement | null = null;
    protected config: IDashboardWidgetConfig;
    protected id: string;

    constructor(initialConfig?: IDashboardWidgetConfig) {
        this.id = Math.floor(Math.random() * Date.now()).toString(16);
        this.config = initialConfig || {} as IDashboardWidgetConfig;
    }

    mount = async (target: HTMLElement, initialConfig: IDashboardWidgetConfig): Promise<void> => {
        this.target = target;
        this.config = initialConfig;

        this.widgetEl = document.createElement("div");
        this.widgetEl.classList.add("widget");
        this.widgetEl.id = this.id;

        target.appendChild(this.widgetEl);

        DashboardWidget.storedWidgets.push(this.config);

        // Usuwanie widgetu
        this.widgetEl.addEventListener("click", () => {
            this.unmount();
        });

        await this.render();
    };

    protected abstract render(): Promise<void> | void;


    async unmount(): Promise<void> {
        console.log(`Usuwanie widgetu o ID: ${this.id}...`);

        if (this.widgetEl) {
            this.widgetEl.remove();
        }

        console.log(DashboardWidget.getStoredWidgets())
        this.widgetEl = undefined;
        this.target = null;
    };

    static getStoredWidgets(): IDashboardWidgetConfig[] {
        return DashboardWidget.storedWidgets;
    }

    static setStoredWidgets(widgets:IDashboardWidgetConfig[]): void {
        DashboardWidget.storedWidgets = widgets ? widgets : [] ;
    }

    invalidate = async (): Promise<void> => {
        if (this.target) {
            await this.render();
            this.onConfigUpdated(this.config);
        }
    };

    public setConfig = (config: Partial<IDashboardWidgetConfig>): void => {
        this.config = {
            ...this.config,
            ...config
        };
        
        this.onConfigUpdated(this.config);
    };

    public getConfig(): IDashboardWidgetConfig{
        console.log(this.config)
        return this.config;
    };

    onConfigUpdated = (config: IDashboardWidgetConfig): void => {
        this.config = config;

        if (this.target) {
            this.target.dispatchEvent(new CustomEvent("configUpdated", { detail: config }));
        }
    };
}