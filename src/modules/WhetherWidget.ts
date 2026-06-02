import type { DashboardWidgetConfig } from "./DashboardWidgetConfigInterface";

export class WhetherWidget {
    private targetElement: HTMLElement | null = null;
    private config: DashboardWidgetConfig;

    #whetherEl: HTMLElement | undefined;
    // config żeby odczytać czas odświeżania  
    constructor(initialConfig?: DashboardWidgetConfig) {
        this.config = initialConfig || {} as DashboardWidgetConfig;
    }

    mount = async (target: HTMLElement): Promise<void> => {
        this.targetElement = target;

        this.#whetherEl = document.createElement("div");
        this.#whetherEl.innerText = "TU BEDZIE POGODA";

        this.targetElement.appendChild(this.#whetherEl);

    };

    unmount = async (): Promise<void> => {
        // if (this.targetElement) {
        //     this.targetElement.innerHTML = '';
        //     this.targetElement = null;
        // }
    };

}