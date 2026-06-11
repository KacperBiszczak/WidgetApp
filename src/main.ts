import { DashboardWidget } from './modules/dashboardWidgets/DashboardWidget';
import type { IDashboardWidgetConfig } from './modules/dashboardWidgets/IDashboardWidgetConfig';
import { WidgetType } from './modules/dashboardWidgets/IDashboardWidgetConfig';
import { DigitalClockWidget } from './modules/dashboardWidgets/DigitalClockWidget';
import './style.css'
import { Dashboard } from './modules/dashboardWidgets/Dashboard';

const app = document.querySelector<HTMLDivElement>('#app');
const dashboard = new Dashboard();
dashboard.mount(app!);

// Roboczy przycisk do dodawania widgetu
/// area 51 (TESTY :D)

const input1 = document.createElement("input");
app?.appendChild(input1)
input1.type = "button";
input1.value = "KLIKNIJ MNIE (ADD_TEST)"
// let counter = 1;
if(app){
    input1.addEventListener("click", () => {
        // Dodawanie widgetu TEST
        const config = {title: "Zegar", refreshInterval: 1000, type: WidgetType.DigitalClock}
        dashboard.createWidget(config);

        console.log(DashboardWidget.getStoredWidgets());
    })
}

const input2 = document.createElement("input");
app?.appendChild(input2)
input2.type = "button";
input2.value = "KLIKNIJ MNIE (STORAGEADDTEST)"
// let counter = 1;
if(app){
    input2.addEventListener("click", () => {
        // Dodawanie widgetu TEST
        const widgets = DashboardWidget.getStoredWidgets();
        // dashboard.createWidget(config);
        widgets.forEach(widgetC => {
            dashboard.createWidget(widgetC);
        })
        console.log(widgets);
    })
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

