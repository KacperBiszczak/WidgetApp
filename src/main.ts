import { DigitalClockWidget } from './modules/dashboardWidgets/DigitalClockWidget';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');

if(app){
new DigitalClockWidget().mount(app, {title: "Testowy widget", refreshInterval: 1000})
}

/// area 51 (TESTY :D)
// Roboczy przycisk do dodawania widgetu
const input1 = document.createElement("input");
input1.type = "button";
input1.value = "KLIKNIJ MNIE (ADD_TEST)"
let counter = 1;
if(app){
    input1.addEventListener("click", () => {
        const clockWidget = new DigitalClockWidget();
        clockWidget.mount(app, {title: "Testowy widget", refreshInterval: 1000});
        counter+= 1;
        clockWidget.setConfig({title: "TESTTTT ZMIANY", refreshInterval: (1000 * counter+1)});
        console.log(clockWidget.getConfig());

    })
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

