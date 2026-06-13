import type { IDashboardWidgetConfig } from "../IDashboardWidgetConfig";
import { DashboardWidget } from "../DashboardWidget";
import { WeatherApiService } from "./WeatherApiService";

export class WeatherWidget extends DashboardWidget {
    private weatherEl: HTMLElement | undefined;
    private readonly weatherApiService = new WeatherApiService();

    constructor(initialConfig?: IDashboardWidgetConfig) {
        super(initialConfig);
    }

    protected render = (): void => {
        if (!this.widgetEl) return;

        // this.widgetEl.innerHTML = "";

        const settingsButton = document.createElement("div");
        settingsButton.classList.add("widgetSettings");
        settingsButton.innerHTML = '<span class="material-symbols-rounded">settings</span>';
        this.widgetMenuEl?.appendChild(settingsButton);

        const settingsContainer = document.createElement("div");
        settingsContainer.classList.add("hidden", "settingsForm");

        const formTitle = document.createElement("div");
        formTitle.classList.add("settingsFormTitle");
        formTitle.innerText = "Ustawienia";

        const cityInput = document.createElement("input");
        cityInput.type = "text";
        cityInput.placeholder = "Miasto";
        cityInput.value = this.config.city ?? "Warszawa";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Zmień";

        const closeButton = document.createElement("button");
        closeButton.classList.add("settingsFormClose");
        closeButton.textContent = "Zamknij";

        const buttons = document.createElement("div");
        buttons.classList.add("settingsFormButtons");
        
        buttons.append(saveButton, closeButton);

        settingsContainer.append(formTitle, cityInput, buttons);

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

        closeButton.addEventListener("click", () => {
            settingsContainer.classList.toggle("hidden");
        });

        this.weatherEl = document.createElement("div");
        this.weatherEl.classList.add("widgetWeather");

        this.widgetEl.append(
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

            const cityEl = document.createElement("div");
            cityEl.classList.add("widgetWeatherCity");
            cityEl.textContent = `${weather.city}, ${weather.country}`;

            const iconEl = document.createElement("img");
            iconEl.classList.add("widgetWeatherIcon");
            iconEl.src = weather.iconUrl;
            iconEl.alt = weather.description;
            
            const tempEl = document.createElement("div");
            tempEl.classList.add("widgetWeatherTemperature")
            tempEl.textContent = `${Math.round(weather.temperature)}°C`;
            
            const weatherDetails = document.createElement("div");
            weatherDetails.classList.add("widgetWeatherDetails");
            weatherDetails.append(iconEl, tempEl);
            
            // const descEl = document.createElement("p");
            // descEl.textContent = weather.description;

            // const humidityEl = document.createElement("p");
            // humidityEl.textContent = `Wilgotność: ${weather.humidity}%`;

            // const windEl = document.createElement("p");
            // windEl.textContent = `Wiatr: ${weather.windKph} km/h`;

            this.weatherEl.append(
                weatherDetails,
                cityEl,
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