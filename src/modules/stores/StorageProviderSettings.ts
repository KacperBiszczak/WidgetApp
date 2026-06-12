import { StorageProviderType, type StorageProviderType as StorageProviderTypeValue } from "./StorageProviderType";

export class StorageProviderSettings {
    private static readonly key = "storageProvider";

    static getSelectedProvider(): StorageProviderTypeValue {
        const provider = localStorage.getItem(this.key);

        if (
            provider === StorageProviderType.LocalStorage ||
            provider === StorageProviderType.IndexedDB ||
            provider === StorageProviderType.Backend
        ) {
            return provider;
        }

        return StorageProviderType.LocalStorage;
    }

    static setSelectedProvider(provider: StorageProviderTypeValue): void {
        localStorage.setItem(this.key, provider);
    }
}