export interface DashboardWidgetInterface<T> {
    mount: (target: HTMLElement, initialConfig: T) => Promise<void>;
    unmount: () => Promise<void>;
    invalidate:() => Promise<void>;
    setConfig: (config: T) => void;
    getConfig: () => T;
    onConfigUpdated: (config: T) => void
} 