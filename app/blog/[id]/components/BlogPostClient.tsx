'use client';

import { motion, Variants } from 'framer-motion'; // 👈 必须显式导入 Variants
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// 1. 引入代码高亮插件
import rehypeHighlight from 'rehype-highlight';

// 2. 引入高亮样式 (这里选用了经典的 Atom One Dark 风格)
import 'highlight.js/styles/atom-one-dark.css';

interface PostProps {
    post: {
        id: number;
        title: string;
        content: string;
        category: string;
        createdAt: string;
    };
}

export default function BlogPostClient({ post }: PostProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring', // 👈 现在有了类型约束，这里就不会报错了
                stiffness: 50,
                damping: 20
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-green-500/30 selection:text-green-200"
        >
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center"
            >
                <div className="max-w-3xl mx-auto w-full px-6 flex justify-between items-center">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-400 transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>cd ..</span>
                    </Link>
                    <div className="text-xs text-gray-600">Reading Mode</div>
                </div>
            </motion.header>

            <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
                <motion.div variants={containerVariants}>

                    <motion.div variants={itemVariants} className="mb-12 border-b border-white/10 pb-12">
                        <div className="flex flex-wrap gap-4 mb-6 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <Tag size={12} />
                  {post.category}
              </span>
                            <span className="inline-flex items-center gap-1.5 text-gray-500">
                <Calendar size={12} />
                                {post.createdAt}
              </span>
                            <span className="inline-flex items-center gap-1.5 text-gray-500">
                <Clock size={12} />
                                {Math.ceil(post.content.length / 300)} min read
              </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                            {post.title}
                        </h1>
                    </motion.div>

                    <motion.article
                        variants={itemVariants}
                        className="prose prose-invert prose-green max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-p:leading-relaxed prose-p:text-gray-400
              prose-pre:bg-[#282c34] /* 这里的背景色要配合代码主题微调 */
              prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              /* 移除 Typography 默认的代码背景，交给 highlight.js 接管 */
              prose-code:bg-transparent prose-code:text-inherit prose-code:p-0
            "
                    >
                        <ReactMarkdown
                            // 3. 启用插件
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </motion.article>

                </motion.div>
            </main>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="py-12 text-center text-xs text-gray-700 border-t border-white/5"
            >
                <p>EOF | Process terminated.</p>
            </motion.footer>
        </motion.div>
    );
}