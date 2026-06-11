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

        const settingsButton = document.createElement("button");
        settingsButton.textContent = "⚙️";

        const settingsContainer = document.createElement("div");
        settingsContainer.classList.add("hidden");

        const cityInput = document.createElement("input");
        cityInput.type = "text";
        cityInput.placeholder = "Miasto";
        cityInput.value = this.config.city ?? "Warszawa";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Zmień";

        settingsContainer.append(cityInput, saveButton);

        settingsButton.addEventListener("click", () => {
            settingsContainer.classList.toggle("hidden");
        });

        saveButton.addEventListener("click", () => {
            const city = cityInput.value.trim();

            if (!city) return;

            this.setConfig({
                city,
            });

            this.updateWeather();

            settingsContainer.classList.add("hidden");
        });

        this.weatherEl = document.createElement("div");

        this.widgetEl.append(
            settingsButton,
            settingsContainer,
            this.weatherEl
        );

        this.updateWeather();
    };

    private updateWeather = (): void => {
        if (!this.weatherEl) return;

        const city = this.config.city ?? "Warszawa";

        const weather = this.getMockWeather(city);

        this.weatherEl.innerHTML = `
            <h2>${weather.city}</h2>
            <p>${weather.description}</p>
            <h3>${weather.temperature}°C</h3>
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