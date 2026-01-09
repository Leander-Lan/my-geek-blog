"use client";

import { useEffect, useState, use } from "react"; // 👈 引入 use 用于解包 params
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Tag, Layout, Type, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
// 👇 引入编辑器组件 (保持你原本的相对路径)
import GeekEditor from "../../../components/GeekEditor";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15 推荐用法：使用 use() 解包 params
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // 表单状态
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        coverImage: "",
        tags: "",
        published: false // 👈 1. 新增：默认为草稿 (false)
    });

    // 1. 页面加载时：获取文章原内容
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        title: data.title || "",
                        content: data.content || "",
                        category: data.category || "Tech",
                        coverImage: data.coverImage || "",
                        tags: data.tags || "",
                        published: data.published || false // 👈 2. 获取并回显当前状态
                    });
                } else {
                    alert("加载文章失败");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // 2. 保存修改
    const handleSave = async () => {
        setSaving(true);

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // 保存成功后提示一下
                alert(`系统提示: ${formData.published ? "文章已更新并发布" : "文章已更新为草稿"}`);
                router.push("/admin/posts"); // 返回列表
                router.refresh();
            } else {
                alert("系统警告: 写入失败");
            }
        } catch (e) {
            alert("网络链路异常");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-green-500 font-mono animate-pulse">LOADING_DATA_BUFFER...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            {/* 顶部导航 */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts">
                        <Button variant="ghost" className="text-slate-400 hover:text-white pl-0">
                            <ArrowLeft className="mr-2 h-4 w-4" /> 返回列表
                        </Button>
                    </Link>
                    <h1 className="text-xl font-mono font-bold text-white">
                        EDIT_MODE <span className="text-green-500 text-sm">:: {formData.title}</span>
                    </h1>
                </div>

                {/* 👇 3. 按钮状态根据 published 变化 */}
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className={`font-mono text-white ${formData.published ? 'bg-green-600 hover:bg-green-500' : 'bg-yellow-600 hover:bg-yellow-500'}`}
                >
                    {saving ? "WRITING..." : (
                        <>
                            {formData.published ? <Globe className="mr-2 h-4 w-4" /> : <Lock className="mr-2 h-4 w-4" />}
                            {formData.published ? "UPDATE (PUBLISHED)" : "UPDATE (DRAFT)"}
                        </>
                    )}
                </Button>
            </div>

            {/* 编辑区域 */}
            <div className="grid gap-6">

                {/* 1. 标题、分类与状态 */}
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            <Type size={14} /> TITLE_STRING
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-white focus:border-green-500 focus:outline-none transition-colors font-bold text-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            <Layout size={14} /> CATEGORY
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-slate-300 focus:border-green-500 focus:outline-none h-[52px]"
                        >
                            <option value="Tech">Tech</option>
                            <option value="Life">Life</option>
                            <option value="Design">Design</option>
                            <option value="Note">Note</option>
                        </select>
                    </div>

                    {/* 👇 4. 新增：状态选择器 */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            {formData.published ? <Globe size={14} className="text-green-500"/> : <Lock size={14} className="text-yellow-500"/>}
                            STATUS
                        </label>
                        <select
                            value={formData.published ? "true" : "false"}
                            onChange={(e) => setFormData({ ...formData, published: e.target.value === "true" })}
                            className={`w-full bg-slate-900/50 border border-slate-800 rounded p-3 focus:border-blue-500 focus:outline-none h-[52px] font-bold ${formData.published ? "text-green-400" : "text-yellow-500"}`}
                        >
                            <option value="false">DRAFT [草稿]</option>
                            <option value="true">PUBLISHED [发布]</option>
                        </select>
                    </div>
                </div>

                {/* 2. 封面图与标签 */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            <ImageIcon size={14} /> COVER_IMAGE_URL
                        </label>
                        <input
                            type="text"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded p-2 text-slate-300 text-sm focus:border-green-500 focus:outline-none font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 flex items-center gap-2">
                            <Tag size={14} /> TAGS (Comma separated)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded p-2 text-slate-300 text-sm focus:border-green-500 focus:outline-none font-mono"
                        />
                    </div>
                </div>

                {/* 3. 正文编辑器 */}
                <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500">CONTENT_BUFFER (RICH TEXT MODE)</label>
                    <GeekEditor
                        value={formData.content}
                        onChange={(val) => setFormData({ ...formData, content: val || "" })}
                    />
                </div>

            </div>
        </div>
    );
}