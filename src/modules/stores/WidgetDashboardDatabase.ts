import Dexie, { type Table } from "dexie";
import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";

export class WidgetDashboardDatabase extends Dexie {
    widgets!: Table<IDashboardWidgetConfig, string>;

    constructor() {
        super("WidgetDashboardDatabase");

        this.version(1).stores({
            widgets: "id,order,type,title",
        });
    }
}

export const widgetDashboardDb = new WidgetDashboardDatabase();