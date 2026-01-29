import { create } from 'zustand';
import { WishlistStore, WishlistItem } from './types';
import { apiClient } from '../lib/api';
import { optimisticUpdate } from './middleware/syncMiddleware';

const WISHLIST_STORAGE_KEY = 'alpha-network-wishlist';

/**
 * Wishlist Store with Zustand
 * Features:
 * - Add, remove, toggle wishlist items
 * - Backend synchronization
 * - localStorage persistence
 * - Auto-sync on user login
 */
export const useWishlistStore = create<WishlistStore>((set, get) => ({
    // State
    items: [],
    isLoading: false,
    isSyncing: false,
    lastSyncedAt: null,
    error: null,

    // Actions
    addToWishlist: async (productId: string) => {
        const currentItems = get().items;

        // Check if already in wishlist
        if (currentItems.some((item) => item.productId === productId)) {
            console.warn('Product already in wishlist');
            return;
        }

        const newItem: WishlistItem = {
            productId,
            addedAt: new Date().toISOString(),
        };
        const newItems = [...currentItems, newItem];

        // Optimistic update
        await optimisticUpdate(
            () => set({ items: newItems }),
            async () => {
                if (apiClient.isAuthenticated()) {
                    const updatedItems = await apiClient.addToWishlist(productId);
                    set({ items: updatedItems, lastSyncedAt: new Date().toISOString() });
                } else {
                    saveToLocalStorage(newItems);
                }
            },
            () => set({ items: currentItems, error: 'Failed to add to wishlist' })
        );
    },

    removeFromWishlist: async (productId: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter((item) => item.productId !== productId);

        // Optimistic update
        await optimisticUpdate(
            () => set({ items: newItems }),
            async () => {
                if (apiClient.isAuthenticated()) {
                    const updatedItems = await apiClient.removeFromWishlist(productId);
                    set({ items: updatedItems, lastSyncedAt: new Date().toISOString() });
                } else {
                    saveToLocalStorage(newItems);
                }
            },
            () => set({ items: currentItems, error: 'Failed to remove from wishlist' })
        );
    },

    toggleWishlist: async (productId: string) => {
        const isInWishlist = get().isInWishlist(productId);

        if (isInWishlist) {
            await get().removeFromWishlist(productId);
        } else {
            await get().addToWishlist(productId);
        }
    },

    isInWishlist: (productId: string) => {
        return get().items.some((item) => item.productId === productId);
    },

    syncWithBackend: async () => {
        if (!apiClient.isAuthenticated()) {
            console.warn('Cannot sync wishlist: user not authenticated');
            return;
        }

        set({ isSyncing: true, error: null });

        try {
            // Get local items
            const localItems = get().items;

            // Fetch backend wishlist
            const backendItems = await apiClient.getWishlist();

            // Merge strategy: combine local and backend items
            const mergedItems = mergeWishlistItems(localItems, backendItems);

            // Update backend with merged items
            // Note: This would require a batch update endpoint
            // For now, we'll just use the backend items
            set({
                items: backendItems,
                isSyncing: false,
                lastSyncedAt: new Date().toISOString(),
                error: null,
            });

            // Clear localStorage after successful sync
            clearLocalStorage();

            console.log('Wishlist synced successfully');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Sync failed';
            set({ isSyncing: false, error: errorMessage });
            console.error('Failed to sync wishlist:', error);
        }
    },
}));

// ============ Helper Functions ============

/**
 * Save wishlist to localStorage for guest users
 */
const saveToLocalStorage = (items: WishlistItem[]): void => {
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Failed to save wishlist to localStorage:', error);
    }
};

/**
 * Clear wishlist from localStorage
 */
const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear wishlist from localStorage:', error);
    }
};

/**
 * Load wishlist from localStorage
 */
export const loadWishlistFromLocalStorage = (): WishlistItem[] => {
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load wishlist from localStorage:', error);
        return [];
    }
};

/**
 * Merge local and backend wishlist items
 */
const mergeWishlistItems = (
    localItems: WishlistItem[],
    backendItems: WishlistItem[]
): WishlistItem[] => {
    const merged = [...localItems];

    backendItems.forEach((backendItem) => {
        const existsLocally = merged.some(
            (localItem) => localItem.productId === backendItem.productId
        );

        if (!existsLocally) {
            merged.push(backendItem);
        }
    });

    return merged;
};

// ============ Auto-sync on Login ============

/**
 * Initialize wishlist store and sync on login
 */
export const initializeWishlistStore = () => {
    // Load from localStorage on initialization
    const storedItems = loadWishlistFromLocalStorage();
    if (storedItems.length > 0) {
        useWishlistStore.setState({ items: storedItems });
    }

    // Listen for login events
    window.addEventListener('auth:login', () => {
        console.log('User logged in, syncing wishlist...');
        useWishlistStore.getState().syncWithBackend();
    });

    // Listen for logout events
    window.addEventListener('auth:logout', () => {
        console.log('User logged out, clearing wishlist...');
        useWishlistStore.setState({
            items: [],
            lastSyncedAt: null,
            error: null,
        });
        clearLocalStorage();
    });
};
