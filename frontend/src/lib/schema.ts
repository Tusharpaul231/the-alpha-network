export const generateProductSchema = (product: any) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image, // Assuming product object has image URL or array
        sku: product._id, // Using Mongo ID as SKU
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR', // Adapt currency as needed
            price: product.price,
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `https://thealphanetwork.in/product/${product.slug || product._id}`,
        },
        brand: {
            '@type': 'Brand',
            name: product.brand || 'The Alpha Network',
        },
        // Add aggregateRating if available
        ...(product.rating && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.numReviews || 0
            }
        })
    };
};

export const generateOrganizationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Alpha Network',
        url: 'https://thealphanetwork.in',
        logo: 'https://thealphanetwork.in/logo.png', // Update with actual logo URL
        sameAs: [
            'https://www.facebook.com/alphanetwork',
            'https://twitter.com/alphanetwork',
            'https://www.instagram.com/alphanetwork'
        ]
    };
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `https://thealphanetwork.in${item.url}`
        }))
    };
};
