'use client'; // 👈 必须保留，因为有动画

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Github, Search, Code2, Coffee, ArrowRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

// 定义文章数据的类型
interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    createdAt: string; // 注意：从服务端传过来时会变成字符串
}

// 接收父组件传来的真实数据
export default function HomeClient({ posts }: { posts: Post[] }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 50]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-green-500/30 selection:text-green-200 overflow-hidden">

            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
            >
                <header className="flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <nav className="flex gap-6 text-sm font-medium">
                        {['Home', 'Blog', 'Projects', 'About'].map((item) => (
                            <Link key={item} href="#" className="relative group text-gray-400 hover:text-white transition-colors">
                                <span className="relative z-10">~/{item}</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <button className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                        <Search size={16} />
                    </button>
                </header>
            </motion.div>

            <main className="max-w-6xl mx-auto px-6 pt-36 pb-20 relative z-10">

                <motion.section
                    style={{ y: y1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6"
                        >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
                            System Online
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tighter">
                            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Leander</span>
                            <br />
                            <span className="text-2xl md:text-4xl text-gray-500 font-normal mt-2 block">
                &lt;FullStack_Developer /&gt;
              </span>
                        </h1>

                        <p className="text-gray-400 max-w-xl text-lg leading-relaxed border-l-2 border-white/10 pl-6 my-8">
                            一名热衷于细节控制的 <span className="text-white">环境设计</span> 学生，
                            同时也沉迷于构建数字世界。这里是我的数字花园，记录代码、生活与奇思妙想。
                        </p>

                        <div className="flex gap-4">
                            <button className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all active:scale-95">
                                <Terminal size={18} />
                                Read_Blog
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all active:scale-95">
                                <Github size={18} />
                                Github
                            </button>
                        </div>
                    </div>

                    <motion.div
                        style={{ y: y2 }}
                        className="hidden md:block relative w-72 h-72 group"
                    >
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500 group-hover:scale-105">
                            <Image
                                src="/avatar.png"
                                alt="Leander Avatar"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-[#0a0a0a] border border-white/10 px-4 py-2 rounded-lg text-xs font-mono text-green-400 shadow-xl animate-bounce delay-700">
                            Running...
                        </div>
                    </motion.div>
                </motion.section>

                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl text-white font-bold flex items-center gap-3">
                            <LayoutGrid className="text-green-500" />
                            Latest_Transmissions
                        </h2>
                        <div className="text-xs text-gray-600 font-mono">
                            [ {posts.length} records found ]
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {posts.length === 0 ? (
                            <div className="col-span-3 text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl">
                                No posts found. Please add some via Prisma Studio.
                            </div>
                        ) : (
                            posts.map((post, index) => (
                                <Link
                                    href={`/blog/${post.id}`}
                                    key={post.id}
                                    className={`
                    group relative rounded-3xl border border-white/5 bg-[#0a0a0a] overflow-hidden 
                    hover:border-green-500/50 transition-colors duration-500 block
                    ${index === 0 ? 'md:col-span-2' : ''}
                  `}
                                >
                                    <motion.div variants={itemVariants} className="h-full">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        <div className={`
                      h-48 w-full bg-gradient-to-br border-b border-white/5 relative overflow-hidden
                      ${index % 3 === 0 ? 'from-green-900/20 to-[#050505]' : ''}
                      ${index % 3 === 1 ? 'from-blue-900/20 to-[#050505]' : ''}
                      ${index % 3 === 2 ? 'from-purple-900/20 to-[#050505]' : ''}
                    `}>
                                            <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white/50 group-hover:text-white transition-colors">
                                                <Code2 size={16} />
                                            </div>
                                        </div>

                                        <div className="p-8 relative z-10">
                                            <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5 group-hover:bg-green-500/10 group-hover:text-green-400 transition-colors">
                          {post.category}
                        </span>
                                                <span className="text-xs text-gray-600 font-mono">
                          {post.createdAt}
                        </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-3 group-hover:text-green-400 transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6">
                                                {post.content}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 group-hover:text-white transition-colors">
                                                <span>READ_LOG</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        )}
                    </motion.div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-12 text-center relative z-10 bg-[#050505]">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-xs mb-4">
                    <Coffee size={14} />
                    <span>Fueled by Caffeine & Code</span>
                </div>
                <p className="text-gray-700 text-xs">
                    © 2026 Leander's Space. <span className="text-green-900/50">System Stable.</span>
                </p>
            </footer>
        </div>
    );
}