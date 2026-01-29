import React from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';
import { SEOHead } from '../seo/SEOHead';
import { useCartStore } from '../../stores/useCartStore';

/**
 * Example Cart Component
 * Demonstrates cart store usage with all operations
 */
export const CartExample: React.FC = () => {
    const {
        items,
        isLoading,
        isSyncing,
        error,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
    } = useCartStore();

    if (isLoading) {
        return <div className="cart-loading">Loading cart...</div>;
    }

    if (error) {
        return <div className="cart-error">Error: {error}</div>;
    }

    return (
        <div className="cart-container">
            <SEOHead
                title="Shopping Cart"
                description="Review and purchase your selected items."
            />
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                {isSyncing && <span className="sync-indicator">Syncing...</span>}
                <span className="cart-count">{getTotalItems()} items</span>
            </div>

            {items.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item.product._id} className="cart-item">
                                <div className="item-image">
                                    {item.product.images[0] && (
                                        <OptimizedImage
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="item-details">
                                    <h3>{item.product.name}</h3>
                                    <p className="item-price">${item.product.price.toFixed(2)}</p>
                                    <p className="item-category">{item.product.category}</p>
                                </div>

                                <div className="item-quantity">
                                    <button
                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                        disabled={item.quantity >= item.product.stock}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="item-total">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    className="item-remove"
                                    onClick={() => removeFromCart(item.product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                        </div>

                        <div className="cart-actions">
                            <button className="btn-checkout">Proceed to Checkout</button>
                            <button className="btn-clear" onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartExample;
