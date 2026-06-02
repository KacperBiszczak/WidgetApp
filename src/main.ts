import { DashboardWidget } from './modules/DashboardWidget'
import { widgetType } from './modules/DashboardWidgetConfigInterface';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');

// const simpleWidget = new DashboardWidget();

if(app){
new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000})
new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000})
new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000})

}

// area 51


const input1 = document.createElement("input");
input1.type = "button";
input1.value = "KLIKNIJ MNIE (ADD_TEST)"
if(app){
    input1.addEventListener("click", () => {
        const newWidget = new DashboardWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000, type: widgetType.whetherWidget})
    }
)}

app?.appendChild(input1);

// TO DO:
// Widgety:
// DigitalClockWidget
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

