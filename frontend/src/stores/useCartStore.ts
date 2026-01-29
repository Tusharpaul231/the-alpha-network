import { create } from 'zustand';
import { CartStore, Product, CartItem } from './types';
import { apiClient } from '../lib/api';
import { optimisticUpdate } from './middleware/syncMiddleware';

const CART_STORAGE_KEY = 'alpha-network-cart';

/**
 * Cart Store with Zustand
 * Features:
 * - Add, remove, update cart items
 * - Optimistic updates for instant UI feedback
 * - Backend synchronization
 * - localStorage persistence
 * - Auto-sync on user login
 */
export const useCartStore = create<CartStore>((set, get) => ({
    // State
    items: [],
    isLoading: false,
    isSyncing: false,
    lastSyncedAt: null,
    error: null,

    // Actions
    addToCart: async (product: Product, quantity: number = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
            (item) => item.product._id === product._id
        );

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
            // Update existing item quantity
            newItems = currentItems.map((item, index) =>
                index === existingItemIndex
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            // Add new item
            const newItem: CartItem = {
                product,
                quantity,
                addedAt: new Date().toISOString(),
            };
            newItems = [...currentItems, newItem];
        }

        // Optimistic update
        await optimisticUpdate(
            () => set({ items: newItems }),
            async () => {
                if (apiClient.isAuthenticated()) {
                    const updatedItems = await apiClient.addToCart(product._id, quantity);
                    set({ items: updatedItems, lastSyncedAt: new Date().toISOString() });
                } else {
                    // Save to localStorage for guest users
                    saveToLocalStorage(newItems);
                }
            },
            () => set({ items: currentItems, error: 'Failed to add item to cart' })
        );
    },

    removeFromCart: async (productId: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter((item) => item.product._id !== productId);

        // Optimistic update
        await optimisticUpdate(
            () => set({ items: newItems }),
            async () => {
                if (apiClient.isAuthenticated()) {
                    const updatedItems = await apiClient.removeFromCart(productId);
                    set({ items: updatedItems, lastSyncedAt: new Date().toISOString() });
                } else {
                    saveToLocalStorage(newItems);
                }
            },
            () => set({ items: currentItems, error: 'Failed to remove item from cart' })
        );
    },

    updateQuantity: async (productId: string, quantity: number) => {
        if (quantity <= 0) {
            return get().removeFromCart(productId);
        }

        const currentItems = get().items;
        const newItems = currentItems.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
        );

        // Optimistic update
        await optimisticUpdate(
            () => set({ items: newItems }),
            async () => {
                if (apiClient.isAuthenticated()) {
                    const updatedItems = await apiClient.updateCartItemQuantity(productId, quantity);
                    set({ items: updatedItems, lastSyncedAt: new Date().toISOString() });
                } else {
                    saveToLocalStorage(newItems);
                }
            },
            () => set({ items: currentItems, error: 'Failed to update quantity' })
        );
    },

    clearCart: async () => {
        const currentItems = get().items;

        // Optimistic update
        await optimisticUpdate(
            () => set({ items: [] }),
            async () => {
                if (apiClient.isAuthenticated()) {
                    await apiClient.clearCart();
                    set({ lastSyncedAt: new Date().toISOString() });
                } else {
                    clearLocalStorage();
                }
            },
            () => set({ items: currentItems, error: 'Failed to clear cart' })
        );
    },

    syncWithBackend: async () => {
        if (!apiClient.isAuthenticated()) {
            console.warn('Cannot sync cart: user not authenticated');
            return;
        }

        set({ isSyncing: true, error: null });

        try {
            // Get local items
            const localItems = get().items;

            // Fetch backend cart
            const backendItems = await apiClient.getCart();

            // Merge strategy: prefer local items if they exist
            const mergedItems = mergeCartItems(localItems, backendItems);

            // Update backend with merged items
            await apiClient.updateCart(mergedItems);

            set({
                items: mergedItems,
                isSyncing: false,
                lastSyncedAt: new Date().toISOString(),
                error: null,
            });

            // Clear localStorage after successful sync
            clearLocalStorage();

            console.log('Cart synced successfully');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Sync failed';
            set({ isSyncing: false, error: errorMessage });
            console.error('Failed to sync cart:', error);
        }
    },

    getTotalPrice: () => {
        return get().items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    },

    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
}));

// ============ Helper Functions ============

/**
 * Save cart to localStorage for guest users
 */
const saveToLocalStorage = (items: CartItem[]): void => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
};

/**
 * Clear cart from localStorage
 */
const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear cart from localStorage:', error);
    }
};

/**
 * Load cart from localStorage
 */
export const loadCartFromLocalStorage = (): CartItem[] => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        return [];
    }
};

/**
 * Merge local and backend cart items
 * Strategy: Prefer local items, add backend items that don't exist locally
 */
const mergeCartItems = (localItems: CartItem[], backendItems: CartItem[]): CartItem[] => {
    const merged = [...localItems];

    backendItems.forEach((backendItem) => {
        const existsLocally = merged.some(
            (localItem) => localItem.product._id === backendItem.product._id
        );

        if (!existsLocally) {
            merged.push(backendItem);
        }
    });

    return merged;
};

// ============ Auto-sync on Login ============

/**
 * Initialize cart store and sync on login
 */
export const initializeCartStore = () => {
    // Load from localStorage on initialization
    const storedItems = loadCartFromLocalStorage();
    if (storedItems.length > 0) {
        useCartStore.setState({ items: storedItems });
    }

    // Listen for login events
    window.addEventListener('auth:login', () => {
        console.log('User logged in, syncing cart...');
        useCartStore.getState().syncWithBackend();
    });

    // Listen for logout events
    window.addEventListener('auth:logout', () => {
        console.log('User logged out, clearing cart...');
        useCartStore.setState({
            items: [],
            lastSyncedAt: null,
            error: null,
        });
        clearLocalStorage();
    });
};
