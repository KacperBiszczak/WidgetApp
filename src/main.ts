import { Dashboard } from "./modules/dashboardWidgets/Dashboard";
import { WidgetType } from "./modules/dashboardWidgets/IDashboardWidgetConfig";
import { LocalStorageProvider } from "./modules/stores/localStorageProvider";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
    const storage = new LocalStorageProvider();
    const dashboard = new Dashboard(storage);

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
}
///

// TO DO:
// Widgety:
// DigitalClockWidget (dokończyć)
// WhetherWidget
// NewsWidget
// Quote Widget

// Wychodząc do przodu kilka jak nie wszystkie potrzebują swojego parametru w configu, 
// trzeba będzie dodać jako opcjonalne żeby ze storagami się nie mieszały... 🤔 
// Interface'y dla poszczególnych configów

// Storages:
// LocalStorageProvider
// IndexDBStorageProvider
// BackendStorageProvider

// Wizualnie:
// Ładny UI
// Jakaś zmiana motywu jasny/ciemny*

