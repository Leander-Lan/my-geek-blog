import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageTransition from "@/components/PageTransition"; // 👈 引入动画组件

export const dynamic = "force-dynamic";

export default async function BlogIndexPage({
                                                searchParams,
                                            }: {
    searchParams: Promise<{ page?: string }>;
}) {
    // 等待参数解析 (Next.js 15 写法)
    const { page } = await searchParams;

    // 分页逻辑
    const currentPage = parseInt(page || "1");
    const pageSize = 5; // 每页显示 5 篇
    const skip = (currentPage - 1) * pageSize;

    const [posts, totalCount] = await Promise.all([
        prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: pageSize,
            skip: skip,
        }),
        prisma.post.count({ where: { published: true } })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono relative selection:bg-green-500/30 selection:text-green-200">

            {/* 背景纹理 */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <SiteHeader />

            <main className="max-w-4xl mx-auto px-6 pt-36 pb-20 relative z-10">

                {/* 👇👇👇 使用 PageTransition 包裹主要内容区域 */}
                <PageTransition>

                    <h1 className="text-4xl font-bold text-white mb-12 flex items-center gap-2 border-b border-white/10 pb-6">
                        <span className="text-green-500">ls</span> -lat /blog_posts
                        <span className="text-base font-normal text-gray-500 ml-auto">[Total: {totalCount}]</span>
                    </h1>

                    <div className="space-y-8">
                        {posts.map(post => (
                            <article key={post.id} className="group border border-slate-800 bg-[#0a0a0a] p-6 rounded-2xl hover:border-green-500/50 transition-all hover:-translate-y-1 relative overflow-hidden">
                                {/* 悬浮时的微光效果 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start relative z-10">
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                                            <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                                            <span className="w-px h-3 bg-gray-700"/>
                                            <span className="px-2 py-0.5 rounded bg-green-900/20 text-green-400 border border-green-500/20 text-[10px] uppercase tracking-wider">
                                                {post.category || 'System'}
                                            </span>
                                            {/* 如果 published 为 false，显示草稿标记 */}
                                            {!post.published && (
                                                <span className="text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded bg-yellow-900/20">DRAFT</span>
                                            )}
                                        </div>

                                        <Link href={`/blog/${post.id}`} className="block">
                                            <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                            {post.content ? post.content.slice(0, 150).replace(/[#*`>]/g, '') : "No content preview..."}...
                                        </p>
                                    </div>

                                    <Link href={`/blog/${post.id}`} className="self-end md:self-center shrink-0">
                                        <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-gray-400 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-500 transition-all shadow-lg">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                </div>
                            </article>
                        ))}

                        {/* 空状态提示 */}
                        {posts.length === 0 && (
                            <div className="text-center py-20 text-gray-500 font-mono border border-dashed border-slate-800 rounded-xl">
                                // Directory is empty.
                            </div>
                        )}
                    </div>

                    {/* 分页控制器 */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-800 font-mono">
                            {currentPage > 1 ? (
                                <Link href={`/blog?page=${currentPage - 1}`} className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800 text-sm hover:text-green-400 transition-colors">
                                    &lt; cd ..
                                </Link>
                            ) : <div/>}

                            <span className="text-xs text-gray-500">PAGE {currentPage} OF {totalPages}</span>

                            {currentPage < totalPages ? (
                                <Link href={`/blog?page=${currentPage + 1}`} className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800 text-sm hover:text-green-400 transition-colors">
                                    next_page &gt;
                                </Link>
                            ) : <div/>}
                        </div>
                    )}

                </PageTransition>
                {/* 👆👆👆 动画包裹结束 */}

            </main>
        </div>
    );
}