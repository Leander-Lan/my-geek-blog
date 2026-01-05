"use client"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { StarsBackground } from "@/components/animate-ui/stars-background"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminClient({ initialPosts }: { initialPosts: any[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const router = useRouter();

    const handleDelete = async (id: number) => {
        if (!confirm("CRITICAL_ACTION: 确定要从数据库永久抹除此条目吗？")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // 立即更新 UI
                setPosts(posts.filter(p => p.id !== id));
                router.refresh(); // 同步服务端缓存
            } else {
                alert("ACCESS_DENIED: 删除失败");
            }
        } catch (e) {
            alert("NETWORK_ERROR: 无法连接至服务器");
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 p-8 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                {/* 导航栏 */}
                <header className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h1 className="text-2xl font-mono font-bold text-blue-400 tracking-tighter">
                        {">"} ADMIN_DASHBOARD
                    </h1>
                    <div className="flex gap-4">
                        <Link href="/admin/posts/new">
                            <Button className="bg-blue-600 hover:bg-blue-500 font-mono text-xs">
                                [+][NEW_POST]
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="font-mono text-xs"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            TERMINATE_SESSION
                        </Button>
                    </div>
                </header>

                {/* 文章管理列表 */}
                <div className="space-y-4">
                    <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                        Database_Entries: {posts.length}
                    </h2>

                    <div className="grid gap-3">
                        <AnimatePresence>
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="group flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-blue-500/50 transition-all backdrop-blur-sm"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-mono text-blue-100 group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 font-mono">
                                            HEX_ID: {post.id} // TIMESTAMP: {post.createdAt}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            className="h-8 font-mono text-[10px] text-slate-400 hover:text-white"
                                            onClick={() => router.push('/')}
                                        >
                                            VIEW
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="h-8 font-mono text-[10px] bg-red-950/30 text-red-400 border border-red-900/50 hover:bg-red-600 hover:text-white"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            DELETE
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {posts.length === 0 && (
                            <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg text-slate-600 font-mono text-sm">
                                NO_RECORDS_STORED_IN_MEMORY
                            </div>
                        )}
                    </div>
                </div>

                <footer className="mt-12 p-4 bg-blue-950/10 border border-blue-900/20 rounded font-mono text-[10px] text-blue-400/60">
                    SYSTEM_READY // REMOTE_DB_CONNECTED // {new Date().toISOString()}
                </footer>
            </div>
        </div>
    )
}