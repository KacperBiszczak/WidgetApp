import { DashboardWidget } from "./DashboardWidget";
import { DigitalClockWidget } from "./DigitalClockWidget";
import { WidgetType, type IDashboardWidgetConfig } from "./IDashboardWidgetConfig"

export class Dashboard {
    protected dashboardEl: HTMLElement = document.createElement("div");
    protected target: HTMLElement | null = null;
    // protected storedWidgets: DashboardWidget[] = [];
    
    mount = (target: HTMLElement) => {
        this.dashboardEl = document.createElement("div");
        this.dashboardEl.classList.add("widgetContainer");

        target.appendChild(this.dashboardEl);
    }
    
    createWidget = (initialConfig: IDashboardWidgetConfig) => {
        let widget: DashboardWidget | null;
        
        switch(initialConfig.type){
            case WidgetType.DigitalClock:
                widget = new DigitalClockWidget(initialConfig);
                widget.mount(this.dashboardEl, initialConfig);
                break;

            case WidgetType.News:
                // widget = new NewsWidget(initialConfig);
                break;

                // ... finish
            
            default: 
                throw new Error("Zły typ widgetu.")
                break;
        }
    }

    deleteWidget = (ID: String) => {
        return ID;
    }

    updateWidget = (ID: String, config: Partial<IDashboardWidgetConfig>) => {
        return {ID, config};
    }
}