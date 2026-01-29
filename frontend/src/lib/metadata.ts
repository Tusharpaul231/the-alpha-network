export const defaultMetadata = {
    title: 'The Alpha Network',
    description: 'Premium E-Commerce Platform',
    siteUrl: 'https://thealphanetwork.in', // Update with actual URL
    keywords: ['ecommerce', 'premium', 'alpha network', 'shop'],
    twitter: {
        handle: '@alphanetwork',
        site: '@alphanetwork',
        cardType: 'summary_large_image',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        site_name: 'The Alpha Network',
    },
};

export const generateMetadata = (pageMetadata: Partial<typeof defaultMetadata>) => {
    return {
        ...defaultMetadata,
        ...pageMetadata,
        openGraph: {
            ...defaultMetadata.openGraph,
            ...pageMetadata.openGraph,
        },
        twitter: {
            ...defaultMetadata.twitter,
            ...pageMetadata.twitter,
        },
    };
};
