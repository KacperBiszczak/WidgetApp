import type { DashboardWidgetConfig } from "./DashboardWidgetConfigInterface";
import type { DashboardWidgetInterface } from "./DashboardWidgetInterface";

export abstract class DashboardWidget implements DashboardWidgetInterface<DashboardWidgetConfig> {
    protected rootEl: HTMLElement | undefined;
    protected widgetEl: HTMLElement | undefined;
    protected target: HTMLElement | null = null;
    protected config: DashboardWidgetConfig;
    protected id: string;

    constructor(initialConfig?: DashboardWidgetConfig) {
        this.id = Math.floor(Math.random() * Date.now()).toString(16);
        this.config = initialConfig || {} as DashboardWidgetConfig;
    }

    mount = async (target: HTMLElement, initialConfig: DashboardWidgetConfig): Promise<void> => {
        this.target = target;
        this.config = initialConfig;

        this.rootEl = document.createElement("div");
        this.rootEl.classList.add("widgetContainer");

        this.widgetEl = document.createElement("span");
        this.widgetEl.classList.add("widget");
        this.widgetEl.id = this.id;

        this.rootEl.appendChild(this.widgetEl);
        target.appendChild(this.rootEl);

        // Usuwanie widgetu
        this.rootEl.addEventListener("click", () => {
            this.unmount();
        });

        await this.render();
    };

    protected abstract render(): Promise<void> | void;

    async unmount(): Promise<void> {
        console.log(`Usuwanie widgetu o ID: ${this.id}...`);

        if (this.rootEl) {
            this.rootEl.remove();
        }

        this.rootEl = undefined;
        this.widgetEl = undefined;
        this.target = null;
    };

    invalidate = async (): Promise<void> => {
        if (this.target) {
            await this.render();
            this.onConfigUpdated(this.config);
        }
    };

    public setConfig = (config: Partial<DashboardWidgetConfig>): void => {
        this.config = {
            ...this.config,
            ...config
        };
        
        this.onConfigUpdated(this.config);
    };

    public getConfig = (): DashboardWidgetConfig => {
        return this.config;
    };

    onConfigUpdated = (config: DashboardWidgetConfig): void => {
        this.config = config;

        if (this.target) {
            this.target.dispatchEvent(new CustomEvent("configUpdated", { detail: config }));
        }
    };
}