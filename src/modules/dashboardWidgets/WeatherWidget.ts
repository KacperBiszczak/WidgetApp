import type { IDashboardWidgetConfig } from "./IDashboardWidgetConfig";
import { DashboardWidget } from "./DashboardWidget";
import { WeatherApiService } from "../../services/WeatherApiService";

export class WeatherWidget extends DashboardWidget {
    private weatherEl: HTMLElement | undefined;
    private readonly weatherApiService = new WeatherApiService();

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

    private updateWeather = async (): Promise<void> => {
        if (!this.weatherEl) return;

        const city = this.config.city ?? "Warszawa";

        this.weatherEl.innerHTML = "Ładowanie pogody...";

        try {
            const weather = await this.weatherApiService.getCurrentWeather(city);
            
            this.weatherEl.innerHTML = "";

            const cityEl = document.createElement("h4");
            cityEl.textContent = `${weather.city}, ${weather.country}`;

            const iconEl = document.createElement("img");
            iconEl.src = weather.iconUrl;
            iconEl.alt = weather.description;

            const tempEl = document.createElement("p");
            tempEl.textContent = `Temperatura: ${weather.temperature}°C`;

            // const feelsLikeEl = document.createElement("p");
            // feelsLikeEl.textContent = `Odczuwalna: ${weather.feelsLike}°C`;

            const descEl = document.createElement("p");
            descEl.textContent = weather.description;

            const humidityEl = document.createElement("p");
            humidityEl.textContent = `Wilgotność: ${weather.humidity}%`;

            const windEl = document.createElement("p");
            windEl.textContent = `Wiatr: ${weather.windKph} km/h`;

            this.weatherEl.append(
                cityEl,
                iconEl,
                tempEl,
            )
        } catch (error) {
            this.weatherEl.innerHTML = error instanceof Error ? error.message : "Wystąpił błąd podczas pobierania pogody.";
        }

        // const weather = this.getWeather(city);

        // this.weatherEl.innerHTML = `
        //     <h2>${weather.city}</h2>
        //     <p>${weather.description}</p>
        //     <h3>${weather.temperature}°C</h3>
        // `;
    };
}