// Product Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  error: string | null;
}

export interface CartActions {
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithBackend: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export type CartStore = CartState & CartActions;

// Wishlist Types
export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  error: string | null;
}

export interface WishlistActions {
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  syncWithBackend: () => Promise<void>;
}

export type WishlistStore = WishlistState & WishlistActions;

// Product Store Types
export interface ProductFilters {
  category?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: string | null;
}

export interface ProductActions {
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
  searchProducts: (query: string) => Promise<void>;
  clearFilters: () => void;
}

export type ProductStore = ProductState & ProductActions;

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Auth Types (for sync)
export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  token: string;
}

// Storage Types
export interface StorageData<T> {
  version: number;
  data: T;
  timestamp: string;
}
