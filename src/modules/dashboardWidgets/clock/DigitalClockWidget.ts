import type { IDashboardWidgetConfig, ClockFormat } from "../IDashboardWidgetConfig";
import { DashboardWidget } from "../DashboardWidget";

export class DigitalClockWidget extends DashboardWidget {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private digitalClockEl: HTMLElement | undefined;
    
    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = (): void => {
        if (!this.widgetEl) return;

        // this.widgetEl.innerHTML = "";

        const select = document.createElement("div");
        select.classList.add("widgetClockFormat")

        // HH:MM:SS
        const fullFormat = document.createElement("div");
        fullFormat.innerText = "HH:MM:SS";
        fullFormat.classList.add("widgetClockFormatOpt1")

        // HH:MM
        const halfFormat = document.createElement("div");
        halfFormat.innerText = "HH:MM";
        halfFormat.classList.add("widgetClockFormatOpt2")

        select.append(fullFormat,halfFormat);

        fullFormat.addEventListener("click", () => {
            this.setConfig({
                clockFormat: "HH:MM:SS" as ClockFormat
            });       
            this.updateTimeDisplay();
        });

        halfFormat.addEventListener("click", () => {
            this.setConfig({
                clockFormat: "HH:MM" as ClockFormat
            });       
            this.updateTimeDisplay();
        });

        this.digitalClockEl = document.createElement("div");
        this.digitalClockEl.classList.add("widgetClock");
        
        this.widgetEl.append(this.digitalClockEl, select);

        this.updateTimeDisplay();

        this.intervalId = setInterval(() => {
            this.updateTimeDisplay();
        }, this.config.refreshInterval);
    };

    override unmount = async (): Promise<void> => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        await super.unmount();
    };

    private updateTimeDisplay = (): void => {
        if (!this.digitalClockEl) return;

        const format = this.config.clockFormat ?? "HH:MM:SS";

        this.digitalClockEl.textContent = new Date().toLocaleTimeString(
            "pl-PL",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: format === "HH:MM:SS"
                    ? "2-digit"
                    : undefined,
            }
        );
    };
}