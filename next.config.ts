import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 👇 1. 忽略 TypeScript 报错
    typescript: {
        ignoreBuildErrors: true,
    },
    // 👇 2. 忽略 ESLint 报错 (加了这行，构建时就不会管格式问题了)
    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

export default nextConfig;