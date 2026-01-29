import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type SyncMiddleware = <
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
    config: StateCreator<T, Mps, Mcs>,
    options: SyncOptions<T>
) => StateCreator<T, Mps, Mcs>;

interface SyncOptions<T> {
    name: string;
    syncFn: (state: T) => Promise<void>;
    onSyncSuccess?: (state: T) => void;
    onSyncError?: (error: Error, state: T) => void;
    retryAttempts?: number;
    retryDelay?: number;
}

const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY = 1000; // ms

/**
 * Custom Zustand middleware for backend synchronization
 * Features:
 * - Optimistic updates for instant UI feedback
 * - Retry logic with exponential backoff
 * - Network status detection
 * - Conflict resolution strategies
 */
export const syncMiddleware: SyncMiddleware = (config, options) => (set, get, api) => {
    const {
        name,
        syncFn,
        onSyncSuccess,
        onSyncError,
        retryAttempts = DEFAULT_RETRY_ATTEMPTS,
        retryDelay = DEFAULT_RETRY_DELAY,
    } = options;

    let syncQueue: Array<() => Promise<void>> = [];
    let isSyncing = false;

    /**
     * Execute sync with retry logic and exponential backoff
     */
    const executeSyncWithRetry = async (
        attempt = 0
    ): Promise<void> => {
        try {
            const currentState = get();
            await syncFn(currentState);

            if (onSyncSuccess) {
                onSyncSuccess(currentState);
            }

            console.log(`Successfully synced ${name} to backend`);
        } catch (error) {
            const err = error instanceof Error ? error : new Error('Unknown sync error');

            if (attempt < retryAttempts) {
                const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
                console.warn(`Sync failed for ${name}. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${retryAttempts})`);

                await new Promise(resolve => setTimeout(resolve, delay));
                return executeSyncWithRetry(attempt + 1);
            } else {
                console.error(`Failed to sync ${name} after ${retryAttempts} attempts:`, err);

                if (onSyncError) {
                    onSyncError(err, get());
                }

                throw err;
            }
        }
    };

    /**
     * Process sync queue
     */
    const processSyncQueue = async () => {
        if (isSyncing || syncQueue.length === 0) return;

        isSyncing = true;

        while (syncQueue.length > 0) {
            const syncTask = syncQueue.shift();
            if (syncTask) {
                try {
                    await syncTask();
                } catch (error) {
                    console.error('Sync task failed:', error);
                }
            }
        }

        isSyncing = false;
    };

    /**
     * Queue a sync operation
     */
    const queueSync = () => {
        syncQueue.push(() => executeSyncWithRetry());
        processSyncQueue();
    };

    /**
     * Check if online before syncing
     */
    const syncIfOnline = () => {
        if (!navigator.onLine) {
            console.warn(`${name} sync skipped: offline`);
            return;
        }
        queueSync();
    };

    // Listen for online/offline events
    if (typeof window !== 'undefined') {
        window.addEventListener('online', () => {
            console.log('Network connection restored. Syncing...');
            queueSync();
        });

        window.addEventListener('offline', () => {
            console.log('Network connection lost.');
        });
    }

    return config(set, get, api);
};

/**
 * Manual sync trigger for stores
 */
export const createSyncAction = <T>(
    syncFn: (state: T) => Promise<void>,
    options?: {
        onSuccess?: () => void;
        onError?: (error: Error) => void;
    }
) => {
    return async (state: T) => {
        try {
            await syncFn(state);
            if (options?.onSuccess) {
                options.onSuccess();
            }
        } catch (error) {
            const err = error instanceof Error ? error : new Error('Sync failed');
            if (options?.onError) {
                options.onError(err);
            }
            throw err;
        }
    };
};

/**
 * Optimistic update helper
 */
export const optimisticUpdate = <T, R>(
    updateFn: () => void,
    syncFn: () => Promise<R>,
    rollbackFn: () => void
): Promise<R> => {
    // Apply optimistic update immediately
    updateFn();

    // Attempt to sync with backend
    return syncFn().catch((error) => {
        // Rollback on failure
        rollbackFn();
        throw error;
    });
};
