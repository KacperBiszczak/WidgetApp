import { Dashboard } from "./modules/dashboardWidgets/Dashboard";
import { WidgetType } from "./modules/dashboardWidgets/IDashboardWidgetConfig";
import { StorageProviderSelector } from "./modules/stores/storageProvidersFactories/StorageProviderSelector"
import { StorageProviderSettings } from "./modules/stores/storageProvidersFactories/StorageProviderSettings";
import { StorageProviderFactory } from "./modules/stores/storageProvidersFactories/StorageProviderFactory";

// import "./style.css";
import "./style.scss";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {

    // Nagłówek (menu)
    const header = document.createElement("div");
    header.classList.add("app-header");
    app.appendChild(header);
    
    // Wybieranie storage providera
    const providerSelector = new StorageProviderSelector();
    providerSelector.mount(header);
    
    const selectedProvider = StorageProviderSettings.getSelectedProvider();
    const storageProvider = StorageProviderFactory.create(selectedProvider);

    // Przyciski dodawania widgetów
    const addButtons = document.createElement("div");
    addButtons.classList.add("addButtonsContainer");
    header.appendChild(addButtons);

    // Zegar
    const addClockButton = document.createElement("div");
    addClockButton.innerHTML = "<span class='material-symbols-rounded'>nest_clock_farsight_analog</span>";

    addClockButton.addEventListener("click", () => {
        dashboard.createWidget({
            title: "Zegar",
            refreshInterval: 1000,
            type: WidgetType.DigitalClock,
        });
    });

    addButtons.appendChild(addClockButton);

    // Pogoda
    const addWeatherButton = document.createElement("div");
    addWeatherButton.innerHTML = "<span class='material-symbols-rounded'>weather_hail</span>";

    addWeatherButton.addEventListener("click", () => {
        dashboard.createWidget({
            title: "Pogoda",
            refreshInterval: 1000,
            type: WidgetType.Weather,
            city: "Warszawa",
        });
    });

    addButtons.appendChild(addWeatherButton);

    // Wiadomości
    const addNewsButton = document.createElement("div");
    addNewsButton.innerHTML = "<span class='material-symbols-rounded'>news</span>";;

    addNewsButton.addEventListener("click", () => {
        dashboard.createWidget({
            title: "Wiadomości",
            refreshInterval: 1000,
            type: WidgetType.News,
            newsCategory: "general",
        });
    });

    addButtons.appendChild(addNewsButton);

    // Cytaty
    const addQuoteButton = document.createElement("div");
    addQuoteButton.innerHTML = "<span class='material-symbols-rounded'>format_quote</span>";;

    addQuoteButton.addEventListener("click", () => {
        dashboard.createWidget({
            title: "Cytat",
            refreshInterval: 1000,
            type: WidgetType.Quote,
            quoteProvider: "quotable",
        });
    });

    addButtons.appendChild(addQuoteButton);

    // Dashboard widgetów
    const dashboard = new Dashboard(storageProvider);
    dashboard.mount(app);
}

///

// TO DO:
// Widgety:
// DigitalClockWidget (dokończyć)
// WhetherWidget
// NewsWidget
// Quote Widget

// Storages:
// LocalStorageProvider
// IndexDBStorageProvider
// BackendStorageProvider

// Wizualnie:
// Ładny UI
// Jakaś zmiana motywu jasny/ciemny*

