import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
    className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Split className to handle appending cleanly
    const baseClasses = `transition-opacity duration-300 ease-in-out ${className}`;
    const loadingClasses = isLoaded ? 'opacity-100' : 'opacity-0 bg-gray-200';

    if (priority) {
        // Preload critical images
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`${baseClasses} ${loadingClasses}`}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            {...props}
        />
    );
};
