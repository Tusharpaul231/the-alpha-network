import { initializeCartStore } from './useCartStore';
import { initializeWishlistStore } from './useWishlistStore';
import { initializeProductStore } from './useProductStore';

/**
 * Initialize all stores
 * Call this function once when your app starts
 */
export const initializeStores = () => {
    console.log('Initializing stores...');

    // Initialize cart store with localStorage hydration and auth listeners
    initializeCartStore();

    // Initialize wishlist store with localStorage hydration and auth listeners
    initializeWishlistStore();

    // Initialize product store and fetch initial products
    initializeProductStore();

    console.log('Stores initialized successfully');
};

/**
 * Trigger login event to sync stores
 * Call this after successful user login
 */
export const handleUserLogin = () => {
    window.dispatchEvent(new CustomEvent('auth:login'));
};

/**
 * Trigger logout event to clear stores
 * Call this after user logout
 */
export const handleUserLogout = () => {
    window.dispatchEvent(new CustomEvent('auth:logout'));
};
