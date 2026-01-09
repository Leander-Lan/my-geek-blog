"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Terminal, Github, Mail, ArrowRight, Calendar, ExternalLink, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

interface HomeClientProps {
    initialPosts: Post[];
}

export default function HomeClient({ initialPosts }: HomeClientProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-green-500/30 selection:text-green-200 overflow-hidden relative">

            {/* 背景动态网格 */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{
                     backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                     backgroundSize: '30px 30px',
                     transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`
                 }}>
            </div>

            {/* 📱 适配点1：调整顶部内边距 pt-24 (移动端更紧凑)，PC保持 pt-36 */}
            <main className="max-w-6xl mx-auto px-6 pt-24 md:pt-36 pb-20 relative z-10">

                {/* 📱 适配点2：布局方向 flex-col (移动端垂直堆叠)，PC保持 lg:flex-row */}
                <section className="mb-20 md:mb-32 relative flex flex-col lg:flex-row items-center justify-between">

                    {/* 左侧文字区域 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl relative z-10 w-full"
                    >
                        <div className="flex items-center gap-2 text-green-500 mb-6 text-sm font-bold tracking-wider uppercase">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                            System Online :: Welcome Guest
                        </div>

                        {/* 📱 适配点3：字体大小 text-4xl (移动端缩小)，PC保持 md:text-7xl */}
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Leander</span>
                            <br />
                            {/* 📱 适配点4：副标题大小 text-3xl (移动端缩小) */}
                            <span className="text-3xl md:text-6xl text-gray-500">&lt;Developer /&gt;</span>
                        </h1>

                        {/* 📱 适配点5：文字大小 text-base (移动端正常大小)，PC保持 text-lg */}
                        <p className="max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed mb-10 border-l-2 border-green-500/30 pl-6">
                            一名热衷于创造数字体验的大二学生。
                            <br className="hidden md:block"/> {/* 移动端自动换行，不强制 br */}
                            同时也沉迷于构建数字世界。这里是我的数字花园，记录设计与生活。
                        </p>

                        {/* 📱 适配点6：按钮组布局 flex-col (移动端竖排更易点击)，平板以上恢复 flex-row */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <Link href="/blog" className="group px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                                <BookOpen size={18} />
                                Read The Blog
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                            </Link>
                            <Link href="https://github.com/Leander-Lan" target="_blank" className="px-6 py-3 border border-white/20 rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Github size={18} />
                                Github
                            </Link>
                            <Link href="mailto:me@tianiel.top" className="px-6 py-3 border border-white/20 rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Mail size={18} />
                                Email Me
                            </Link>
                        </div>
                    </motion.div>

                    {/* 右侧头像区域 (PC端保持原样，移动端依然隐藏以节省空间，或者你可以把 hidden 改成 block 让它在移动端也显示) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="hidden lg:block absolute right-10 top-20 z-0"
                    >
                        <div className="relative bg-[#0c0c0c] border border-slate-800/80 rounded-[2rem] p-3 shadow-2xl backdrop-blur-sm group hover:border-green-500/30 hover:shadow-green-500/10 transition-all duration-500">
                            <div className="relative rounded-[1.5rem] overflow-hidden">
                                <Image
                                    src="/avatar.png"
                                    alt="Leander Avatar"
                                    width={240}
                                    height={240}
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-30"></div>
                            </div>
                            <div className="flex items-center justify-between mt-4 px-2 pb-1 font-mono text-xs">
                                <div className="flex items-center gap-2 text-green-400">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="tracking-wider font-bold">Running...</span>
                                </div>
                                <span className="text-gray-700">SYS.v2.6</span>
                            </div>
                        </div>
                    </motion.div>

                </section>

                {/* 2. 最新文章 (Latest Logs) */}
                <section id="latest-posts">
                    {/* 📱 适配点7：标题栏布局 flex-col (移动端垂直排列)，PC保持 flex-row */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-white/10 pb-4 gap-4 md:gap-0">
                        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                            <span className="text-blue-500">01.</span> Latest Logs
                        </h2>
                        <Link href="/blog" className="text-sm text-green-500 hover:text-green-400 flex items-center gap-1 group">
                            View All Archives <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {initialPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="absolute top-6 right-6 text-white/5 group-hover:text-green-500/10 transition-colors">
                                    <ExternalLink size={24} />
                                </div>

                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-mono">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="w-px h-3 bg-gray-700"/>
                                    <span className="text-green-500/80 uppercase tracking-wider">
                                        {post.category || 'Uncategorized'}
                                    </span>
                                </div>

                                <Link href={`/blog/${post.id}`} className="block">
                                    <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-green-400 transition-colors line-clamp-1">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                                        {post.content.slice(0, 100).replace(/[#*`]/g, '')}...
                                    </p>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}