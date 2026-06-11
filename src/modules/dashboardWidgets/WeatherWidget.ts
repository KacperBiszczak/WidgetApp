import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import { DashboardWidget } from "./DashboardWidget";

export class WeatherWidget extends DashboardWidget {
    private weatherEl: HTMLElement | undefined;

    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = (): void => {
        if (!this.widgetEl) return;

        this.widgetEl.innerHTML = "";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Miasto";
        input.value = this.config.city ?? "Warszawa";

        const button = document.createElement("button");
        button.textContent = "Zmień";

        this.weatherEl = document.createElement("div");
        this.weatherEl.classList.add("weatherWidget")

        button.addEventListener("click", () => {
            const city = input.value.trim();

            if (!city) return;

            this.setConfig({
                city,
            });

            this.updateWeather();
        });

        this.widgetEl.append(input, button, this.weatherEl);

        this.updateWeather();
    };

    private updateWeather = (): void => {
        if (!this.weatherEl) return;

        const city = this.config.city ?? "Warszawa";

        const mockWeather = this.getMockWeather(city);

        this.weatherEl.innerHTML = `
            <p><strong>${mockWeather.city}</strong></p>
            <p>${mockWeather.temperature}°C</p>
            <p>${mockWeather.description}</p>
        `;
    };

    private getMockWeather(city: string) {
        return {
            city,
            temperature: 22,
            description: "Słonecznie",
        };
    }
}