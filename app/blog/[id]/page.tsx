import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import CommentsSection from "@/components/CommentsSection";
import PageTransition from "@/components/PageTransition"; // 👈 1. 引入动画组件
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        return notFound();
    }

    const session = await auth();
    const isAdmin = !!session?.user;

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-green-500/30 selection:text-green-200">
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <SiteHeader />

            <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 relative z-10">

                {/* 👇👇👇 2. 用动画组件包裹主要内容 */}
                <PageTransition>

                    <Link href="/blog" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
                        cd ..
                    </Link>

                    <article>
                        <header className="mb-12 border-b border-white/10 pb-8">
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-mono mb-6">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12}/> {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12}/> {new Date(post.createdAt).toLocaleTimeString('zh-CN')}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-green-900/20 text-green-400 border border-green-500/20 uppercase tracking-wider">
                                    {post.category || 'System'}
                                </span>
                                {/* 草稿标签：只有管理员进来看预览时才会显示，普通用户在列表页根本看不到这篇 */}
                                {!post.published && (
                                    <span className="text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded bg-yellow-900/20">DRAFTING</span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                                    <Image
                                        src="/avatar.png"
                                        alt="Leander"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span>Author: Leander (Admin)</span>
                            </div>
                        </header>

                        <div className="prose prose-invert prose-green max-w-none mb-20">
                            {post.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 leading-relaxed text-gray-300">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>

                    <CommentsSection postId={post.id} isAdmin={isAdmin} />

                </PageTransition>

            </main>
        </div>
    );
}