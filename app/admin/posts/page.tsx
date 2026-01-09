"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Lock } from "lucide-react"; // 引入图标

interface Post {
    id: string;
    title: string;
    createdAt: string;
    published: boolean; // 👈 记得确认这里加了 published 类型
}

export default function PostsManagement() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 1. 获取文章列表
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/posts');
                if (!res.ok) throw new Error("网络响应异常");
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("获取失败:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // 2. 删除逻辑
    const handleDelete = async (id: string) => {
        if (!confirm("⚠️ 高能预警：确定要永久删除这篇文章吗？")) return;
        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
                router.refresh();
            } else {
                alert("删除失败");
            }
        } catch (e) {
            alert("网络错误");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-mono font-bold text-white">文章数据矩阵 [ARTICLE_MATRIX]</h2>
                <Link href="/admin/posts/new">
                    <Button className="bg-blue-600 hover:bg-blue-500 font-mono text-xs">
                        + 新建文章
                    </Button>
                </Link>
            </div>

            <div className="grid gap-3">
                {loading ? (
                    <div className="text-slate-500 font-mono text-sm animate-pulse">正在读取数据流 [LOADING]...</div>
                ) : (
                    <AnimatePresence>
                        {posts.length === 0 ? (
                            <div className="text-center py-10 border border-dashed border-slate-800 rounded text-slate-500 font-mono text-sm">暂无数据</div>
                        ) : (
                            posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-blue-500/50 transition-all group"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            {/* 👇 状态指示灯 */}
                                            {post.published ? (
                                                <span className="flex items-center gap-1 text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded border border-green-800/50 font-mono">
                                                    <Globe size={10} /> PUBLISHED
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] bg-yellow-900/30 text-yellow-500 px-2 py-0.5 rounded border border-yellow-800/50 font-mono">
                                                    <Lock size={10} /> DRAFT
                                                </span>
                                            )}
                                            <h3 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                                                {post.title}
                                            </h3>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-mono pl-1">
                                            ID: {post.id} <span className="mx-2">//</span>
                                            {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/posts/${post.id}/edit`}>
                                            <Button size="sm" className="h-8 font-mono text-[10px] bg-blue-950/30 text-blue-400 border border-blue-900/50 hover:bg-blue-600 hover:text-white transition-colors">
                                                编辑
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" className="h-8 text-xs bg-red-950/30 text-red-400 border border-red-900/50 hover:bg-red-600 hover:text-white transition-colors" onClick={() => handleDelete(post.id)}>
                                            删除
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}