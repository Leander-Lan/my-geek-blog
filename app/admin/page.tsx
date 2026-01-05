// app/admin/page.tsx
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import AdminClient from "./AdminClient"

export default async function AdminPage() {
    // 1. 服务端校验权限
    const session = await auth();
    if (!session) redirect("/login");

    // 2. 抓取文章列表
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // 3. 格式化数据传给客户端组件
    const safePosts = posts.map(p => ({
        id: p.id,
        title: p.title,
        createdAt: p.createdAt.toLocaleDateString('zh-CN')
    }));

    return <AdminClient initialPosts={safePosts} />;
}