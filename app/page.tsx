// app/page.tsx

// 【关键添加】：强制每次请求都重新从数据库读取，不使用缓存
export const dynamic = "force-dynamic";

import { prisma } from '@/lib/prisma';
import HomeClient from './components/HomeClient';

export default async function Home() {
    try {
        // 1. 从数据库读取文章
        const data = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // 2. 核心修复：如果 data 是 undefined 或 null，则赋值为空数组 []
        const safeData = data || [];

        // 3. 格式化数据，同时对时间字段做安全处理
        const posts = safeData.map((post) => ({
            ...post,
            createdAt: post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('zh-CN')
                : "2026-01-01",
        }));

        // 4. 将安全的数据传给 UI 组件
        return <HomeClient posts={posts} />;
    } catch (error) {
        console.error("BUILD_DATA_COLLECTION_ERROR:", error);
        // 如果数据库连接彻底失败，返回空数组以保证构建通过
        return <HomeClient posts={[]} />;
    }
}