import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import BlogPostClient from './components/BlogPostClient'; // 引入刚才写的组件

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: {
            // 直接使用 id，不需要 Number() 转换
            id: id,
        },
    });

    if (!post) {
        return (
            <div className="min-h-screen bg-[#050505] text-gray-400 flex flex-col items-center justify-center font-mono">
                <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                <p>Post Not Found</p>
                <Link href="/" className="mt-8 text-green-500 hover:underline">
                    Return Home
                </Link>
            </div>
        );
    }

    // 序列化数据：把 Date 对象转成 String，避免 Client Component 报错
    const formattedPost = {
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString('zh-CN'),
    };

    // 把数据传给带动画的客户端组件
    return <BlogPostClient post={formattedPost} />;
}