import React from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';
import { useWishlistStore } from '../../stores/useWishlistStore';
import { useProductStore } from '../../stores/useProductStore';
import { useCartStore } from '../../stores/useCartStore';

/**
 * Example Wishlist Component
 * Demonstrates wishlist store usage with toggle and move to cart
 */
export const WishlistExample: React.FC = () => {
    const { items, isLoading, error, removeFromWishlist, isSyncing } = useWishlistStore();
    const products = useProductStore((state) => state.products);
    const addToCart = useCartStore((state) => state.addToCart);

    // Get full product details for wishlist items
    const wishlistProducts = items
        .map((item) => products.find((p) => p._id === item.productId))
        .filter((p) => p !== undefined);

    const handleMoveToCart = async (productId: string) => {
        const product = products.find((p) => p._id === productId);
        if (product) {
            await addToCart(product, 1);
            await removeFromWishlist(productId);
        }
    };

    if (isLoading) {
        return <div className="wishlist-loading">Loading wishlist...</div>;
    }

    if (error) {
        return <div className="wishlist-error">Error: {error}</div>;
    }

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h2>My Wishlist</h2>
                {isSyncing && <span className="sync-indicator">Syncing...</span>}
                <span className="wishlist-count">{items.length} items</span>
            </div>

            {items.length === 0 ? (
                <div className="wishlist-empty">
                    <p>Your wishlist is empty</p>
                    <p>Start adding products you love!</p>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlistProducts.map((product) => (
                        <div key={product._id} className="wishlist-item">
                            <div className="item-image">
                                {product.images[0] && (
                                    <OptimizedImage
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="item-details">
                                <h3>{product.name}</h3>
                                <p className="item-price">${product.price.toFixed(2)}</p>
                                <p className="item-category">{product.category}</p>

                                {product.stock > 0 ? (
                                    <span className="stock-status in-stock">In Stock</span>
                                ) : (
                                    <span className="stock-status out-of-stock">Out of Stock</span>
                                )}
                            </div>

                            <div className="item-actions">
                                <button
                                    className="btn-add-to-cart"
                                    onClick={() => handleMoveToCart(product._id)}
                                    disabled={product.stock === 0}
                                >
                                    Move to Cart
                                </button>
                                <button
                                    className="btn-remove"
                                    onClick={() => removeFromWishlist(product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistExample;
