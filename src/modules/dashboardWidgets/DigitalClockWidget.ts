import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import { DashboardWidget } from "./DashboardWidget";

export class DigitalClockWidget extends DashboardWidget {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    
    #digitalClockEl: HTMLElement | undefined;
    
    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }
    
    #refreshInterval = this.config.refreshInterval;

    protected render = (): void => {
        if (!this.widgetEl) return;

        this.#digitalClockEl = document.createElement("div");
        this.widgetEl.appendChild(this.#digitalClockEl);

        this.updateTimeDisplay();

        this.intervalId = setInterval(() => {
            this.updateTimeDisplay();
        }, this.#refreshInterval);
    };

    override unmount = async (): Promise<void> => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        await super.unmount();
    };

    private updateTimeDisplay = (): void => {
        if (this.#digitalClockEl) {
            this.#digitalClockEl.innerText =
                // W przyszłości tutaj zmiana formatu hh:mm / hh:mm:ss
                new Date().toLocaleTimeString("pl-PL");
        }
    };
}