import type { DashboardWidgetConfig } from "./DashboardWidgetConfigInterface";

export class DigitalClockWidget {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private targetElement: HTMLElement | null = null;
    private config: DashboardWidgetConfig;

    #digitalClockEl: HTMLElement | undefined;

    constructor(initialConfig?: DashboardWidgetConfig) {
        this.config = initialConfig || {} as DashboardWidgetConfig;
    }

    mount = async (target: HTMLElement): Promise<void> => {
        this.targetElement = target;
        this.#digitalClockEl = document.createElement("div");
        this.targetElement.appendChild(this.#digitalClockEl);
        
        this.updateTimeDisplay();

        this.intervalId = setInterval(() => {
            this.updateTimeDisplay();
        }, 1000);
    };

    unmount = async (): Promise<void> => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // if (this.targetElement) {
        //     this.targetElement.innerHTML = '';
        //     this.targetElement = null;
        // }
    };

    private updateTimeDisplay = (): void => {
        if (this.#digitalClockEl) {
            const currentTime = new Date();
            this.#digitalClockEl.innerText = currentTime.toLocaleTimeString('pl-PL');
        }
    };
}