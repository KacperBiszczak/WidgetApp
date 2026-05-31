import { DashboardWidget } from './modules/DashboardWidget'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');

const simpletWidget = new DashboardWidget();

simpletWidget.mount(app!, {title: "Testowy widget", refreshInterval: 1000})
simpletWidget.mount(app!, {title: "Testowy widget", refreshInterval: 1000})
simpletWidget.mount(app!, {title: "Testowy widget", refreshInterval: 1000})



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

