export const StorageProviderType = {
    LocalStorage: "localStorage",
    IndexedDB: "indexedDB",
    Backend: "backend",
} as const;

export type StorageProviderType =
    (typeof StorageProviderType)[keyof typeof StorageProviderType];