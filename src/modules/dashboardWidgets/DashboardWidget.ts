import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import type { IDashboardWidget } from "./IDashboardWidget";

export abstract class DashboardWidget implements IDashboardWidget<IDashboardWidgetConfig> {
    
    protected widgetEl: HTMLElement | undefined;
    protected target: HTMLElement | null = null;
    protected config: IDashboardWidgetConfig;

    constructor(initialConfig?: IDashboardWidgetConfig) {
        this.config = initialConfig || {} as IDashboardWidgetConfig;
    }

    mount = async (target: HTMLElement, initialConfig: IDashboardWidgetConfig): Promise<void> => {
        this.target = target;
        this.config = initialConfig;

        this.widgetEl = document.createElement("div");
        this.widgetEl.classList.add("widget");

        target.appendChild(this.widgetEl);
        
        await this.render();

        // Usuwanie widgetu
        const deleteButton = document.createElement("span");
        deleteButton.innerText = "❌";
        deleteButton.classList.add("widgetDeleteButton");

        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();

            this.widgetEl?.dispatchEvent(
                new CustomEvent("deleteWidget", {
                    bubbles: true,
                    detail: { id: this.getId() }
                })
            );
        });

        this.widgetEl.appendChild(deleteButton);
    };

    protected abstract render(): Promise<void> | void;


    async unmount(): Promise<void> {
        if (this.widgetEl) {
            this.widgetEl.remove();
        }

        this.widgetEl = undefined;
        this.target = null;
    };

    invalidate = async (): Promise<void> => {
        if (this.target) {
            await this.render();
            this.onConfigUpdated(this.config);
        }
    };

    public getId(): String {
        return this.config.id;
    }

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