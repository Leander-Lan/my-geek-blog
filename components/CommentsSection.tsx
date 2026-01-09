"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// 👇 1. 引入 Trash2 (删除图标)
import { Send, Loader2, Smile, Monitor, Globe, Cpu, Trash2 } from "lucide-react";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
    id: string;
    content: string;
    nickname: string;
    avatarUrl: string;
    os: string;
    browser: string;
    ip: string;
    createdAt: string;
}

// 👇 2. 修改组件接收的参数，增加 isAdmin
interface CommentsSectionProps {
    postId: string;
    isAdmin: boolean;
}

export default function CommentsSection({ postId, isAdmin }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 👇 3. 新增状态：记录正在删除哪个评论（为了显示转圈圈）
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        content: ""
    });

    // 加载评论
    useEffect(() => {
        fetch(`/api/comments?postId=${postId}`)
            .then(res => res.json())
            .then(data => {
                setComments(Array.isArray(data) ? data : []);
                setIsLoading(false);
            });
    }, [postId]);

    // 点击外部关闭 Emoji 选择器
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.content.trim() || !formData.email.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, postId })
            });

            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setFormData({ nickname: "", email: "", content: "" }); // 清空表单
                setShowEmojiPicker(false);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // 👇 4. 新增：处理删除逻辑
    const handleDeleteClick = async (commentId: string) => {
        if (!confirm("⚠️ Are you sure you want to delete this comment?")) return;

        setDeletingId(commentId);
        try {
            const res = await fetch(`/api/comments?id=${commentId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // 删除成功后，直接在前端过滤掉这条评论，不需要刷新页面
                setComments(prev => prev.filter(c => c.id !== commentId));
            } else {
                alert("Failed to delete comment.");
            }
        } catch (error) {
            alert("Error occurred while deleting.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEmojiClick = (emojiData: any) => {
        setFormData(prev => ({ ...prev, content: prev.content + emojiData.emoji }));
    };

    return (
        <section className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <span className="text-green-500">#</span> System_Logs / Comments
            </h2>

            {/* 提交表单 */}
            <form onSubmit={handleSubmit} className="mb-12 bg-[#0c0c0c] border border-white/5 p-6 rounded-xl relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text" placeholder="Nickname (Optional)"
                        value={formData.nickname}
                        onChange={e => setFormData({...formData, nickname: e.target.value})}
                        className="bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-white focus:border-green-500 outline-none"
                    />
                    <input
                        type="email" placeholder="Email (Required for Avatar) *" required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-white focus:border-green-500 outline-none"
                    />
                </div>
                <div className="relative">
                    <textarea
                        placeholder="Write a comment... (Supports Markdown-ish)" required rows={4}
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-white focus:border-green-500 outline-none resize-none"
                    />
                    {/* Emoji 按钮 */}
                    <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="absolute right-3 bottom-3 text-gray-400 hover:text-green-500 transition-colors">
                        <Smile size={20}/>
                    </button>

                    {/* Emoji 选择器面板 */}
                    <AnimatePresence>
                        {showEmojiPicker && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                ref={emojiPickerRef} className="absolute right-0 bottom-full mb-2 z-20 shadow-2xl"
                            >
                                <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} width={300} height={350} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-gray-500 font-mono">Your email is used for Gravatar and will not be published.</p>
                    <button disabled={isSubmitting} type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold flex items-center gap-2 disabled:opacity-50 transition-colors text-sm">
                        {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>}
                        Commit Log
                    </button>
                </div>
            </form>

            {/* 评论列表 */}
            {isLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin text-green-500"/></div>
            ) : comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map(comment => (
                        <motion.div
                            initial={{opacity:0, y:20}}
                            animate={{opacity:1, y:0}}
                            exit={{opacity:0, scale: 0.9}} // 删除时的动画
                            key={comment.id}
                            // 👇 5. 增加了 relative 和 group，为了让删除按钮绝对定位且hover显示
                            className="relative group flex gap-4 bg-[#0a0a0a] border border-white/5 p-5 rounded-xl"
                        >
                            {/* 👇 6. 管理员删除按钮 (绝对定位在右上角) */}
                            {isAdmin && (
                                <button
                                    onClick={() => handleDeleteClick(comment.id)}
                                    disabled={deletingId === comment.id}
                                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
                                    title="Delete Comment"
                                >
                                    {deletingId === comment.id ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16}/>}
                                </button>
                            )}

                            <div className="shrink-0">
                                <Image src={comment.avatarUrl} alt={comment.nickname} width={48} height={48} className="rounded-full border border-slate-700"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-white font-bold">{comment.nickname}</h4>
                                    <span className="text-xs text-gray-500 font-mono">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="text-gray-300 text-sm whitespace-pre-wrap mb-3">{comment.content}</p>
                                {/* 元数据信息 (极客风格) */}
                                <div className="flex flex-wrap gap-3 text-[10px] font-mono text-gray-600 bg-[#050505] p-2 rounded border border-white/5">
                                    {comment.os && <span className="flex items-center gap-1"><Cpu size={10}/> {comment.os}</span>}
                                    {comment.browser && <span className="flex items-center gap-1"><Monitor size={10}/> {comment.browser}</span>}
                                    {comment.ip && <span className="flex items-center gap-1"><Globe size={10}/> {comment.ip}</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-8 font-mono">// No logs found. Be the first to execute a comment.</p>
            )}
        </section>
    );
}