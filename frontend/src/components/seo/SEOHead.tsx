import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultMetadata } from '../../lib/metadata';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string[];
    children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title = defaultMetadata.title,
    description = defaultMetadata.description,
    image,
    url,
    type = 'website',
    keywords = defaultMetadata.keywords,
    children,
}) => {
    const metaTitle = title === defaultMetadata.title ? title : `${title} | ${defaultMetadata.title}`;
    const fullUrl = url ? `${defaultMetadata.siteUrl}${url}` : defaultMetadata.siteUrl;
    const metaImage = image ? (image.startsWith('http') ? image : `${defaultMetadata.siteUrl}${image}`) : undefined;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="title" content={metaTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />

            {/* Viewport & Charset */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={description} />
            {metaImage && <meta property="og:image" content={metaImage} />}
            <meta property="og:site_name" content={defaultMetadata.openGraph.site_name} />

            {/* Twitter */}
            <meta property="twitter:card" content={defaultMetadata.twitter.cardType} />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={description} />
            {metaImage && <meta property="twitter:image" content={metaImage} />}

            {/* Canonical */}
            <link rel="canonical" href={fullUrl} />

            {children}
        </Helmet>
    );
};
