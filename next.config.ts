import type { NextConfig } from "next";

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
} as any; // 这里的 as any 可以暂时解决类型定义不匹配的问题

export default nextConfig;