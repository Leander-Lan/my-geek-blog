import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient"; // 👈 建议用 @/components 确保路径正确

// 强制动态渲染，保证每次刷新都能看到最新文章
export const dynamic = "force-dynamic";

export default async function HomePage() {
    // 1. 从数据库查最新的 4 篇【已发布】文章
    const posts = await prisma.post.findMany({
        where: {
            published: true // 👈 关键修改：只显示已发布的，草稿不会出现在首页
        },
        orderBy: { createdAt: 'desc' },
        take: 4,
    });

    // 2. 格式化数据 (Next.js 客户端组件不支持直接传 Date 对象，需要转成字符串)
    const serializedPosts = posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category || "Tech",
        createdAt: post.createdAt.toISOString(), // 把 Date 转为 String
    }));

    // 3. 传给客户端组件
    return <HomeClient initialPosts={serializedPosts} />;
}