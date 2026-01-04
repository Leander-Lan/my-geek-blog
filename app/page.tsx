import { prisma } from '@/lib/prisma';
import HomeClient from './components/HomeClient'; // 引入刚才分离出去的客户端组件

// 这是一个服务端组件 (没有 'use client')
export default async function Home() {
    // 1. 从数据库读取文章，按时间倒序
    const data = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    // 2. 格式化数据 (防止 Date 对象传给客户端报错)
    const posts = data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString('zh-CN'),
    }));

    // 3. 将数据传给 UI 组件
    return <HomeClient posts={posts} />;
}