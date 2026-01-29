import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { StorageData } from '../types';

type LocalStorageMiddleware = <
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
    config: StateCreator<T, Mps, Mcs>,
    options: LocalStorageOptions<T>
) => StateCreator<T, Mps, Mcs>;

interface LocalStorageOptions<T> {
    name: string;
    version?: number;
    partialize?: (state: T) => Partial<T>;
    onRehydrateStorage?: (state: T) => void;
}

const STORAGE_VERSION = 1;
const DEBOUNCE_MS = 500;

/**
 * Custom Zustand middleware for localStorage persistence
 * Features:
 * - Automatic state serialization/deserialization
 * - Debounced writes to prevent excessive I/O
 * - Versioning for migration support
 * - Error handling for quota exceeded
 */
export const localStorageMiddleware: LocalStorageMiddleware = (config, options) => (set, get, api) => {
    const { name, version = STORAGE_VERSION, partialize, onRehydrateStorage } = options;

    let debounceTimer: NodeJS.Timeout | null = null;

    // Hydrate state from localStorage on initialization
    const hydrateState = () => {
        try {
            const storedData = localStorage.getItem(name);
            if (!storedData) return;

            const parsed: StorageData<any> = JSON.parse(storedData);

            // Check version compatibility
            if (parsed.version !== version) {
                console.warn(`Storage version mismatch for ${name}. Clearing old data.`);
                localStorage.removeItem(name);
                return;
            }

            // Merge stored data with initial state
            const currentState = get();
            const hydratedState = { ...currentState, ...parsed.data };

            // Use api.setState to update without triggering listeners
            api.setState(hydratedState, true);

            if (onRehydrateStorage) {
                onRehydrateStorage(hydratedState);
            }

            console.log(`Hydrated ${name} from localStorage`);
        } catch (error) {
            console.error(`Failed to hydrate ${name} from localStorage:`, error);
            localStorage.removeItem(name);
        }
    };

    // Persist state to localStorage with debouncing
    const persistState = (state: any) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            try {
                const dataToPersist = partialize ? partialize(state) : state;

                const storageData: StorageData<any> = {
                    version,
                    data: dataToPersist,
                    timestamp: new Date().toISOString(),
                };

                localStorage.setItem(name, JSON.stringify(storageData));
            } catch (error) {
                if (error instanceof Error && error.name === 'QuotaExceededError') {
                    console.error(`localStorage quota exceeded for ${name}`);
                    // Optionally clear old data or notify user
                } else {
                    console.error(`Failed to persist ${name} to localStorage:`, error);
                }
            }
        }, DEBOUNCE_MS);
    };

    // Hydrate on initialization
    hydrateState();

    // Wrap the original setState to persist on every change
    const wrappedConfig: StateCreator<any, any, any> = (wrappedSet, wrappedGet, wrappedApi) => {
        const store = config(
            (partial, replace) => {
                wrappedSet(partial, replace);
                persistState(wrappedGet());
            },
            wrappedGet,
            wrappedApi
        );

        return store;
    };

    return wrappedConfig(set, get, api);
};

/**
 * Clear all localStorage data for a specific store
 */
export const clearLocalStorage = (name: string): void => {
    try {
        localStorage.removeItem(name);
        console.log(`Cleared localStorage for ${name}`);
    } catch (error) {
        console.error(`Failed to clear localStorage for ${name}:`, error);
    }
};

/**
 * Get storage data without hydrating
 */
export const getStorageData = <T>(name: string): T | null => {
    try {
        const storedData = localStorage.getItem(name);
        if (!storedData) return null;

        const parsed: StorageData<T> = JSON.parse(storedData);
        return parsed.data;
    } catch (error) {
        console.error(`Failed to get storage data for ${name}:`, error);
        return null;
    }
};
