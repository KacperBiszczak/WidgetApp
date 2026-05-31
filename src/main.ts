import { DashboardWidget } from './modules/DashboardWidget'
import { widgetType } from './modules/DashboardWidgetConfigInterface';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');

const simpleWidget = new DashboardWidget();

if(app){
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000,type: widgetType.digitalClockWidget})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000})
simpleWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000})
}

app?.addEventListener('click', () =>{
    simpleWidget.unmount();
})


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

