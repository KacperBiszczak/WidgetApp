import type { IWidgetStorageProvider } from "../IWidgetStorageProvider";
import { LocalStorageProvider } from "../LocalStorageProvider";
import { IndexedDBStorageProvider } from "../IndexedDBStorageProvider";
import { BackendStorageProvider } from "../BackendStorageProvider";
import { StorageProviderType, type StorageProviderType as StorageProviderTypeValue } from "./StorageProviderType";

export class StorageProviderFactory {
    static create(type: StorageProviderTypeValue): IWidgetStorageProvider {
        switch (type) {
            case StorageProviderType.LocalStorage:
                return new LocalStorageProvider();

            case StorageProviderType.IndexedDB:
                return new IndexedDBStorageProvider();

            case StorageProviderType.Backend:
                return new BackendStorageProvider();

            default:
                return new LocalStorageProvider();
        }
    }
}