export interface IMappingStorage {
    getAllMappings(): Promise<Record<string, string>>;
    saveMapping(original: string, replacement: string): Promise<void>;
    removeMapping(original: string): Promise<void>;
}

const DB_NAME = 'SheetHarvestDB';
const STORE_NAME = 'value_mappings';
const DB_VERSION = 1;

export class IndexedDbMappingStorage implements IMappingStorage {
    private dbPromise: Promise<IDBDatabase>;

    constructor() {
        this.dbPromise = new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                // Если мы на сервере (Next.js SSR), просто возвращаем "пустое" обещание
                // (хотя до реального обращения к методам дойти не должно)
                return;
            }
            
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    async getAllMappings(): Promise<Record<string, string>> {
        if (typeof window === 'undefined') return {}; // Для SSR
        const db = await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            const keysRequest = store.getAllKeys();

            let values: string[] = [];
            let keys: string[] = [];

            request.onsuccess = () => {
                values = request.result;
                keysRequest.onsuccess = () => {
                    keys = keysRequest.result as string[];
                    const mappings: Record<string, string> = {};
                    keys.forEach((k, i) => {
                        mappings[k] = values[i];
                    });
                    resolve(mappings);
                };
            };
            request.onerror = () => reject(request.error);
        });
    }

    async saveMapping(original: string, replacement: string): Promise<void> {
        if (typeof window === 'undefined') return;
        const db = await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(replacement, original);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async removeMapping(original: string): Promise<void> {
        if (typeof window === 'undefined') return;
        const db = await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(original);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}
