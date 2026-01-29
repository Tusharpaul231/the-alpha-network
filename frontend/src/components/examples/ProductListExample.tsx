import React, { useState } from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';
import { SEOHead } from '../seo/SEOHead';
import { StructuredData } from '../seo/StructuredData';
import { generateBreadcrumbSchema } from '../../lib/schema';
import { useProductStore, useFilteredProducts } from '../../stores/useProductStore';
import { useCartStore } from '../../stores/useCartStore';
import { useWishlistStore } from '../../stores/useWishlistStore';

/**
 * Example Product List Component
 * Demonstrates product store with filtering and search
 */
export const ProductListExample: React.FC = () => {
    const {
        isLoading,
        error,
        filters,
        setFilters,
        searchProducts,
        clearFilters,
    } = useProductStore();

    const products = useFilteredProducts();
    const addToCart = useCartStore((state) => state.addToCart);
    const { toggleWishlist, isInWishlist } = useWishlistStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        searchProducts(searchQuery);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setFilters({ ...filters, category: category || undefined });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        clearFilters();
    };

    if (isLoading) {
        return <div className="products-loading">Loading products...</div>;
    }

    if (error) {
        return <div className="products-error">Error: {error}</div>;
    }

    return (
        <div className="products-container">
            <SEOHead
                title="Shop Premium Products"
                description="Browse our exclusive collection of premium products across electronics, clothing, and more."
                keywords={['shop', 'premium', 'store', 'alpha network']}
            />
            <StructuredData
                data={generateBreadcrumbSchema([
                    { name: 'Home', url: '/' },
                    { name: 'Products', url: '/products' }
                ])}
            />
            <div className="products-header">
                <h2>Products</h2>

                <div className="products-filters">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>

                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="home">Home & Garden</option>
                    </select>

                    {(filters.search || filters.category) && (
                        <button onClick={handleClearFilters} className="btn-clear-filters">
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            <div className="products-count">
                Showing {products.length} products
            </div>

            <div className="products-grid">
                {products.map((product, index) => (
                    <div key={product._id} className="product-card">
                        <div className="product-image">
                            {product.images[0] && (
                                <OptimizedImage
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    priority={index < 4}
                                />
                            )}

                            <button
                                className={`btn-wishlist ${isInWishlist(product._id) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product._id)}
                                title={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                ♥
                            </button>
                        </div>

                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="product-description">
                                {product.description.substring(0, 100)}...
                            </p>

                            <div className="product-tags">
                                {product.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>

                                {product.stock > 0 ? (
                                    <button
                                        className="btn-add-to-cart"
                                        onClick={() => addToCart(product, 1)}
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <span className="out-of-stock">Out of Stock</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="no-products">
                    <p>No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default ProductListExample;
