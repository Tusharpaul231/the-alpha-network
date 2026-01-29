import axios, { AxiosInstance, AxiosError } from 'axios';
import { Product, CartItem, WishlistItem, ApiResponse, ApiError } from '../stores/types';

//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'auth_token';

/**
 * API Client for backend communication
 * Handles authentication, error handling, and retries
 */
class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor to add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<ApiError>) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    this.clearToken();
                    window.dispatchEvent(new CustomEvent('auth:logout'));
                }
                return Promise.reject(this.handleError(error));
            }
        );
    }

    private getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    private clearToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    private handleError(error: AxiosError<ApiError>): ApiError {
        if (error.response?.data) {
            return error.response.data;
        }
        return {
            message: error.message || 'An unexpected error occurred',
            statusCode: error.response?.status || 500,
        };
    }

    // ============ CART API ============

    async getCart(): Promise<CartItem[]> {
        const response = await this.client.get<ApiResponse<{ items: CartItem[] }>>('/cart');
        return response.data.data.items;
    }

    async updateCart(items: CartItem[]): Promise<void> {
        await this.client.put<ApiResponse<void>>('/cart', { items });
    }

    async addToCart(productId: string, quantity: number): Promise<CartItem[]> {
        const response = await this.client.post<ApiResponse<{ items: CartItem[] }>>('/cart/add', {
            productId,
            quantity,
        });
        return response.data.data.items;
    }

    async removeFromCart(productId: string): Promise<CartItem[]> {
        const response = await this.client.delete<ApiResponse<{ items: CartItem[] }>>(
            `/cart/items/${productId}`
        );
        return response.data.data.items;
    }

    async updateCartItemQuantity(productId: string, quantity: number): Promise<CartItem[]> {
        const response = await this.client.patch<ApiResponse<{ items: CartItem[] }>>(
            `/cart/items/${productId}`,
            { quantity }
        );
        return response.data.data.items;
    }

    async clearCart(): Promise<void> {
        await this.client.delete<ApiResponse<void>>('/cart');
    }

    // ============ WISHLIST API ============

    async getWishlist(): Promise<WishlistItem[]> {
        const response = await this.client.get<ApiResponse<{ items: WishlistItem[] }>>('/wishlist');
        return response.data.data.items;
    }

    async addToWishlist(productId: string): Promise<WishlistItem[]> {
        const response = await this.client.post<ApiResponse<{ items: WishlistItem[] }>>('/wishlist', {
            productId,
        });
        return response.data.data.items;
    }

    async removeFromWishlist(productId: string): Promise<WishlistItem[]> {
        const response = await this.client.delete<ApiResponse<{ items: WishlistItem[] }>>(
            `/wishlist/${productId}`
        );
        return response.data.data.items;
    }

    // ============ PRODUCTS API ============

    async getProducts(params?: {
        category?: string;
        tags?: string[];
        minPrice?: number;
        maxPrice?: number;
        search?: string;
    }): Promise<Product[]> {
        const response = await this.client.get<ApiResponse<{ products: Product[] }>>('/products', {
            params,
        });
        return response.data.data.products;
    }

    async getProductBySlug(slug: string): Promise<Product> {
        const response = await this.client.get<ApiResponse<{ product: Product }>>(`/products/${slug}`);
        return response.data.data.product;
    }

    // ============ AUTH API ============

    async login(email: string, password: string): Promise<string> {
        const response = await this.client.post<ApiResponse<{ token: string }>>('/auth/login', {
            email,
            password,
        });
        const token = response.data.data.token;
        localStorage.setItem(TOKEN_KEY, token);
        return token;
    }

    async logout(): Promise<void> {
        this.clearToken();
        await this.client.post('/auth/logout');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
