import { AuthProvider } from "../auth/AuthProvider";
import type { IDashboardWidgetConfig } from "../dashboardWidgets/IDashboardWidgetConfig";
import type { IWidgetStorageProvider } from "./IWidgetStorageProvider";
import type { BackendDashboardConfigDto } from "./backend/BackendDtos";
import Toast from "typescript-toastify";

export class BackendStorageProvider implements IWidgetStorageProvider {
    private readonly baseUrl = "https://wiboard-backend.runasp.net";
    private readonly dashboardConfigEndpoint = "/api/dashboard/config";
    private readonly authProvider = new AuthProvider();

    async loadWidgets(): Promise<IDashboardWidgetConfig[]> {
        const dto = await this.request<BackendDashboardConfigDto>(
            this.dashboardConfigEndpoint
        );

        return this.mapFromBackendDto(dto);
    }

    async saveWidgets(
        widgets: IDashboardWidgetConfig[]
    ): Promise<IDashboardWidgetConfig[]> {
        const dto = this.mapToBackendDto(widgets);

        await this.request<void>(
            this.dashboardConfigEndpoint,
            {
                method: "PUT",
                body: JSON.stringify(dto),
            }
        );

        return widgets;
    }

    async createWidget(
        widget: IDashboardWidgetConfig
    ): Promise<IDashboardWidgetConfig> {
        const widgets = await this.loadWidgets();

        widgets.push(widget);

        await this.saveWidgets(widgets);

        return widget;
    }

    async updateWidget(
        widget: IDashboardWidgetConfig
    ): Promise<IDashboardWidgetConfig> {
        const widgets = await this.loadWidgets();

        const updatedWidgets = widgets.map((currentWidget) =>
            currentWidget.id === widget.id
                ? widget
                : currentWidget
        );

        await this.saveWidgets(updatedWidgets);

        return widget;
    }

    async deleteWidget(id: string): Promise<void> {
        const widgets = await this.loadWidgets();

        const filteredWidgets = widgets.filter(
            (widget) => widget.id !== id
        );

        await this.saveWidgets(filteredWidgets);
    }

    private mapToBackendDto(
        widgets: IDashboardWidgetConfig[]
    ): BackendDashboardConfigDto {
        return {
            version: 1,
            widgets: widgets.map((widget) => ({
                id: widget.id,
                config: widget,
            })),
        };
    }

    private mapFromBackendDto(
        dto: BackendDashboardConfigDto | null
    ): IDashboardWidgetConfig[] {
        if (!dto || !dto.widgets) {
            return [];
        }

        return dto.widgets
            .filter((widget) => widget.config !== null)
            .map((widget) => widget.config);
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.authProvider.getToken();

        if (!token) {
            const toast = new Toast({
                position: "top-right",
                toastMsg: "Zaloguj się, by korzystać z aplikacji!",
                autoCloseTime: 3000,
                canClose: true,
                showProgress: true,
                pauseOnHover: true,
                pauseOnFocusLoss: true,
                type: "default",
                theme: "dark"
            });

            toast.toastMsg;
            throw new Error("Brak tokenu. Zaloguj się do backendu.");
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(
                `Backend error: ${response.status} ${response.statusText}`
            );
        }

        if (response.status === 204) {
            return undefined as T;
        }

        return await response.json();
    }
}