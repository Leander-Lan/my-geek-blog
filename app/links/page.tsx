"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // 确保这一行只出现一次
import { Link as LinkIcon, Plus, X, Globe, Mail, Send, Loader2 } from "lucide-react";
import Image from "next/image";

interface LinkItem {
    id: string;
    name: string;
    url: string;
    avatar: string;
    description: string;
    status: string;
}

export default function LinksPage() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "", url: "", avatar: "", description: "", email: ""
    });

    useEffect(() => {
        fetch('/api/links')
            .then(res => res.json())
            .then(data => setLinks(Array.isArray(data) ? data : []));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("申请已发送！请等待站长审核，通过后将邮件通知您。");
                setIsModalOpen(false);
                setFormData({ name: "", url: "", avatar: "", description: "", email: "" });
            } else {
                alert("提交失败，请检查填写内容");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono relative overflow-hidden pt-36 px-6">

            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* 返回首页按钮 */}
                <div className="mb-8">
                    <Link href="/" className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm">
                        <span className="group-hover:-translate-x-1 transition-transform">&lt;-</span>
                        cd .. /return_home
                    </Link>
                </div>

                {/* 头部 */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                            <Globe className="text-blue-500" /> FRIEND_NODES
                        </h1>
                        <p className="text-gray-500 text-sm">
                            // Connecting to the geek universe...
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-2 px-6 py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                    >
                        <Plus size={18} />
                        <span>JOIN_NETWORK</span>
                    </button>
                </div>

                {/* 友链列表 (带动画) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {links.map((link) => (
                        <motion.a
                            href={link.url}
                            target="_blank"
                            key={link.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5, scale: 1.02 }} // 悬浮动画
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-blue-500/50 transition-colors flex items-start gap-4"
                        >
                            <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-slate-900 group-hover:border-blue-500 transition-colors">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <Image
                                        src={link.avatar || "/avatar.png"}
                                        alt={link.name}
                                        width={56}
                                        height={56}
                                        className="object-cover"
                                    />
                                </div>
                                {/* 绿灯只有Approved才亮，这里假设能显示的都是Approved */}
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#050505] rounded-full flex items-center justify-center">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-blue-400 transition-colors">
                                    {link.name}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2 h-9">
                                    {link.description || "No description provided."}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-gray-600">
                                    <LinkIcon size={10} />
                                    <span className="truncate max-w-[150px]">{link.url}</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* 申请弹窗 */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0c0c0c] border border-slate-800 rounded-2xl p-8 z-50 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">APPLY_FOR_LINK</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 font-mono">SITE_NAME *</label>
                                    <input required className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                           value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="极客博客" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 font-mono">SITE_URL *</label>
                                    <input required className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                           value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://example.com" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 font-mono">AVATAR_URL</label>
                                    <input className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                           value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})} placeholder="https://.../avatar.png" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 font-mono">DESCRIPTION</label>
                                    <input className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                           value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="一个热爱技术的博客..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-500 font-mono">EMAIL (For notification) *</label>
                                    <input required type="email" className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                           value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="admin@example.com" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                    SUBMIT_APPLICATION
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}