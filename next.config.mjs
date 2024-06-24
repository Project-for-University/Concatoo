/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        urlImports: ['https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js'],
    },
};

export default nextConfig;
