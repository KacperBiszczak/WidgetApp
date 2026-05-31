import type { DashboardWidgetConfig } from "./DashboardWidgetConfigInterface";
import type { DashboardWidgetInterface } from "./DashboardWidgetInterface";

export class DashboardWidget implements DashboardWidgetInterface<DashboardWidgetConfig> {
    #rootEl: HTMLElement | undefined;
    #widgetEl: HTMLElement | undefined;
    
    private config: DashboardWidgetConfig;
    private target: HTMLElement | null = null;

    constructor(initialConfig?: DashboardWidgetConfig) {
        this.config = initialConfig || {} as DashboardWidgetConfig;
    }

    mount = async (target: HTMLElement, initialConfig: DashboardWidgetConfig): Promise<void> => {
        this.target = target;
        this.config = initialConfig;

        this.#rootEl = document.createElement("div");
        this.#rootEl.classList.add("widgetContainer");
        target.appendChild(this.#rootEl);

        // Tu będziemy dodawać konkretne widgety, tymczasowo jest wstawiony zwykły tekst
        this.#widgetEl = document.createElement("span");
        this.#widgetEl.classList.add("widget");
        this.#widgetEl.innerHTML = "Tutaj będzie widget"

        this.#rootEl.appendChild(this.#widgetEl);

        // target.innerHTML = '<div class="dashboard-widget">Dashboard Widget</div>';
    };

    unmount = async (): Promise<void> => {
        if (this.target) {
            this.target.innerHTML = '';
            this.target = null;
        }
    };

    invalidate = async (): Promise<void> => {
        if (this.target) {
            this.onConfigUpdated(this.config);
        }
    };

    setConfig = (config: DashboardWidgetConfig): void => {
        this.config = config;
        this.onConfigUpdated(config);
    };

    getConfig = (): DashboardWidgetConfig => {
        return this.config;
    };

    onConfigUpdated = (config: DashboardWidgetConfig): void => {
        this.config = config;
        if (this.target) {
            this.target.dispatchEvent(new CustomEvent('configUpdated', { detail: config }));
        }
    };

}