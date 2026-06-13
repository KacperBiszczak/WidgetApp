import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import type { IDashboardWidget } from "./IDashboardWidget";

export abstract class DashboardWidget implements IDashboardWidget<IDashboardWidgetConfig> {
    
    protected widgetEl: HTMLElement | undefined;
    protected widgetHeaderEl: HTMLElement | undefined;
    protected widgetTitleEl: HTMLElement | undefined;
    protected widgetMenuEl: HTMLElement | undefined;
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

        this.widgetHeaderEl = document.createElement("div");
        this.widgetHeaderEl.classList.add("widgetHeader");
        this.widgetEl.appendChild(this.widgetHeaderEl);

        this.widgetTitleEl = document.createElement("div");
        this.widgetTitleEl.classList.add("widgetTitle");
        this.widgetTitleEl.innerText = this.config.title;
        this.widgetHeaderEl.appendChild(this.widgetTitleEl);

        this.widgetMenuEl = document.createElement("div");
        this.widgetMenuEl.classList.add("widgetMenu");
        this.widgetMenuEl.classList.add("widgetMenu");

        this.widgetHeaderEl.appendChild(this.widgetMenuEl);
        
        target.append(this.widgetEl);
        
        await this.render();
        
        // Usuwanie widgetu
        const deleteButton = document.createElement("div");
        deleteButton.classList.add("widgetDeleteButton");
        deleteButton.innerHTML = '<span class="material-symbols-rounded">close</span>';
        this.widgetMenuEl.appendChild(deleteButton);


        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();

            this.widgetEl?.dispatchEvent(
                new CustomEvent("deleteWidget", {
                    bubbles: true,
                    detail: { id: this.getId() }
                })
            );
        });

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
            this.onConfigUpdated(this.config);

            await this.render();
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