import type { DashboardWidgetConfig } from "./DashboardWidgetConfigInterface";
import { widgetType } from "./DashboardWidgetConfigInterface";
import type { DashboardWidgetInterface } from "./DashboardWidgetInterface";
import { DigitalClockWidget } from "./DigitalClockWidget";
import { WhetherWidget } from "./WhetherWidget";

export class DashboardWidget implements DashboardWidgetInterface<DashboardWidgetConfig> {
    #rootEl: HTMLElement | undefined;
    #widgetEl: HTMLElement | undefined;
    
    private id : String;
    private config: DashboardWidgetConfig;
    private target: HTMLElement | null = null;
    private clock: DigitalClockWidget | undefined;

    constructor(initialConfig?: DashboardWidgetConfig) {
        this.id = Math.floor(Math.random() * Date.now()).toString(16);
        this.config = initialConfig || {} as DashboardWidgetConfig;
    }

    mount = async (target: HTMLElement, initialConfig: DashboardWidgetConfig): Promise<void> => {
        this.target = target;
        this.config = initialConfig;

        this.#rootEl = document.createElement("div");
        this.#rootEl.classList.add("widgetContainer");
        target.appendChild(this.#rootEl);

        this.#rootEl.addEventListener("click", () => {
            this.unmount();
        })

        // Tu będziemy dodawać konkretne widgety, tymczasowo jest wstawiony zwykły tekst
        this.#widgetEl = document.createElement("span");
        this.#widgetEl.classList.add("widget");
        this.#widgetEl.id = this.id.toString();

        switch(this.config.type){
            case widgetType.digitalClockWidget:{ 
                    const clockEl = new DigitalClockWidget(this.config);
                    clockEl.mount(this.#widgetEl);
                break;
            }

            case widgetType.newsWidget:{
                this.#widgetEl.innerHTML = "News";
                break;
            }

            case widgetType.quoteWidget:{
                this.#widgetEl.innerHTML = "Quote";
                break;
            }

            case widgetType.whetherWidget:{
                const whether = new WhetherWidget(this.config);
                whether.mount(this.#widgetEl);
                break;
            }

            default:{
                this.#widgetEl.innerHTML = `Błędny typ widgeta ${this.id}`;
                break;
            }
        }

        this.#rootEl.appendChild(this.#widgetEl);

        // target.innerHTML = '<div class="dashboard-widget">Dashboard Widget</div>';
    };

    unmount = async (): Promise<void> => {
        console.log(`Usuwanie widgetu o ID: ${this.id}...`);
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