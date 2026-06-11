import type { IDashboardWidgetConfig, ClockFormat } from "./IDashboardWidgetConfig";
import { DashboardWidget } from "./DashboardWidget";

export class DigitalClockWidget extends DashboardWidget {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private digitalClockEl: HTMLElement | undefined;
    
    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = (): void => {
        if (!this.widgetEl) return;

        this.widgetEl.innerHTML = "";

        const select = document.createElement("select");

        const option1 = document.createElement("option");
        option1.value = "HH:MM:SS";
        option1.textContent = "HH:MM:SS";

        const option2 = document.createElement("option");
        option2.value = "HH:MM";
        option2.textContent = "HH:MM";

        select.append(option1,option2);

        select.value = this.config.clockFormat ?? "HH:MM:SS";

        select.addEventListener("change", () => {
            this.setConfig({
                clockFormat: select.value as ClockFormat
            });       
            this.updateTimeDisplay();
        });

        this.digitalClockEl = document.createElement("div");
        this.digitalClockEl.classList.add("clockWidget");
        
        this.widgetEl.append(select, this.digitalClockEl);

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