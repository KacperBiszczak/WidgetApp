import { Dashboard } from "./modules/dashboardWidgets/Dashboard";
import { WidgetType } from "./modules/dashboardWidgets/IDashboardWidgetConfig";
import { StorageProviderSelector } from "./modules/stores/storageProvidersFactories/StorageProviderSelector"
import { StorageProviderSettings } from "./modules/stores/storageProvidersFactories/StorageProviderSettings";
import { StorageProviderFactory } from "./modules/stores/storageProvidersFactories/StorageProviderFactory";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
    const providerSelector = new StorageProviderSelector();
    providerSelector.mount(app);

    const selectedProvider = StorageProviderSettings.getSelectedProvider();
    const storageProvider = StorageProviderFactory.create(selectedProvider);

    const dashboard = new Dashboard(storageProvider);
    dashboard.mount(app);

    const addButton = document.createElement("input");
    addButton.type = "button";
    addButton.value = "Dodaj zegar";

    addButton.addEventListener("click", () => {
        dashboard.createWidget({
            title: "Zegar",
            refreshInterval: 1000,
            type: WidgetType.DigitalClock,
        });
    });

    app.appendChild(addButton);

    const addWeatherButton = document.createElement("input");
    addWeatherButton.type = "button";
    addWeatherButton.value = "Dodaj pogodę";

    addWeatherButton.addEventListener("click", () => {
        dashboard.createWidget({
            title: "Pogoda",
            refreshInterval: 1000,
            type: WidgetType.Weather,
            city: "Warszawa",
        });
    });

    app.appendChild(addWeatherButton);
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

