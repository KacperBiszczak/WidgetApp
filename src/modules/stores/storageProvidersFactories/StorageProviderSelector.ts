import { StorageProviderType } from "./StorageProviderType";
import { StorageProviderSettings } from "./StorageProviderSettings";
import { BackendLoginForm } from "../../auth/BackendLoginForm";

export class StorageProviderSelector {
    private selectEl: HTMLSelectElement;
    private backendLoginForm = new BackendLoginForm();

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
        this.backendLoginForm.mount(target);

        if (this.selectEl.value === StorageProviderType.Backend) {
            this.backendLoginForm.show();
        } else {
            this.backendLoginForm.hide();
        }
    }
}