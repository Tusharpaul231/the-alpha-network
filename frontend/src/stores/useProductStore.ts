import { create } from 'zustand';
import { ProductStore, ProductFilters, Product } from './types';
import { apiClient } from '../lib/api';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Product Store with Zustand
 * Features:
 * - Fetch products with filters
 * - Search functionality
 * - In-memory caching with TTL
 * - Single product details
 */
export const useProductStore = create<ProductStore>((set, get) => ({
    // State
    products: [],
    currentProduct: null,
    filters: {},
    isLoading: false,
    error: null,
    lastFetchedAt: null,

    // Actions
    fetchProducts: async (filters?: ProductFilters) => {
        // Check cache validity
        const { lastFetchedAt, products } = get();
        const now = Date.now();

        if (
            lastFetchedAt &&
            products.length > 0 &&
            now - new Date(lastFetchedAt).getTime() < CACHE_TTL &&
            !filters // Only use cache if no filters applied
        ) {
            console.log('Using cached products');
            return;
        }

        set({ isLoading: true, error: null });

        try {
            const fetchedProducts = await apiClient.getProducts(filters);

            set({
                products: fetchedProducts,
                filters: filters || {},
                isLoading: false,
                lastFetchedAt: new Date().toISOString(),
                error: null,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
            set({ isLoading: false, error: errorMessage });
            console.error('Failed to fetch products:', error);
        }
    },

    fetchProductBySlug: async (slug: string) => {
        set({ isLoading: true, error: null });

        try {
            const product = await apiClient.getProductBySlug(slug);

            set({
                currentProduct: product,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
            set({ isLoading: false, error: errorMessage, currentProduct: null });
            console.error('Failed to fetch product:', error);
        }
    },

    setFilters: (filters: ProductFilters) => {
        set({ filters });
        get().fetchProducts(filters);
    },

    searchProducts: async (query: string) => {
        const filters: ProductFilters = {
            ...get().filters,
            search: query,
        };

        await get().fetchProducts(filters);
    },

    clearFilters: () => {
        set({ filters: {} });
        get().fetchProducts();
    },
}));

/**
 * Initialize product store
 */
export const initializeProductStore = () => {
    // Fetch products on initialization
    useProductStore.getState().fetchProducts();
};

/**
 * Helper hooks for common use cases
 */

/**
 * Get filtered products
 */
export const useFilteredProducts = () => {
    const products = useProductStore((state) => state.products);
    const filters = useProductStore((state) => state.filters);

    return products.filter((product) => {
        // Category filter
        if (filters.category && product.category !== filters.category) {
            return false;
        }

        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
            const hasMatchingTag = filters.tags.some((tag) => product.tags.includes(tag));
            if (!hasMatchingTag) return false;
        }

        // Price range filter
        if (filters.minPrice !== undefined && product.price < filters.minPrice) {
            return false;
        }
        if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
            return false;
        }

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesName = product.name.toLowerCase().includes(searchLower);
            const matchesDescription = product.description.toLowerCase().includes(searchLower);
            const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(searchLower));

            if (!matchesName && !matchesDescription && !matchesTags) {
                return false;
            }
        }

        return true;
    });
};

/**
 * Get product by ID from store
 */
export const useProductById = (productId: string): Product | undefined => {
    return useProductStore((state) =>
        state.products.find((p) => p._id === productId)
    );
};

/**
 * Get products by category
 */
export const useProductsByCategory = (category: string): Product[] => {
    return useProductStore((state) =>
        state.products.filter((p) => p.category === category)
    );
};
