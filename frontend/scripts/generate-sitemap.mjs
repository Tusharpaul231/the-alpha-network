import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// Use this for ESM if needed, or switch to CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://thealphanetwork.in';
const API_URL = 'http://localhost:5000/api'; // Adjust based on your backend environment

async function generateSitemap() {
    try {
        const pages = [
            '',
            '/about',
            '/contact',
            '/login',
            '/register',
            '/cart',
            '/wishlist',
        ];

        // Fetch products
        // Assuming GET /products returns a list of products
        // Adjust api endpoint according to your backend
        let products = [];
        try {
            const { data } = await axios.get(`${API_URL}/products`);
            products = data.products || data;
        } catch (error) {
            console.warn('Could not fetch products for sitemap. Ensure backend is running.', error.message);
        }

        const productUrls = products.map((product) => `/product/${product.slug || product._id}`);

        const allRoutes = [...pages, ...productUrls];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
                .map((route) => {
                    return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
                })
                .join('')}
</urlset>`;

        const publicDir = path.resolve(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
        console.log('✅ Sitemap generated successfully at public/sitemap.xml');

        // Also generate robots.txt
        const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
        fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
        console.log('✅ Robots.txt generated successfully at public/robots.txt');

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
