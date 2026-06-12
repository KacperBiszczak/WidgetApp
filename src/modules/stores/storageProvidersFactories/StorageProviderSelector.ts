import { StorageProviderType } from "./StorageProviderType";
import { StorageProviderSettings } from "./StorageProviderSettings";

export class StorageProviderSelector {
    private selectEl: HTMLSelectElement;

    constructor() {
        this.selectEl = document.createElement("select");

        this.selectEl.innerHTML = `
            <option value="${StorageProviderType.LocalStorage}">LocalStorage</option>
            <option value="${StorageProviderType.IndexedDB}">IndexedDB</option>
            <option value="${StorageProviderType.Backend}">Backend</option>
        `;

        this.selectEl.value = StorageProviderSettings.getSelectedProvider();

        this.selectEl.addEventListener("change", () => {
            StorageProviderSettings.setSelectedProvider(
                this.selectEl.value as StorageProviderType
            );

            window.location.reload();
        });
    }

    public mount(target: HTMLElement): void {
        target.prepend(this.selectEl);
    }
}