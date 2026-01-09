"use client";

import { useState, useEffect } from "react";
import { Check, X, Trash2, Globe, Mail, Edit, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkItem {
    id: string;
    name: string;
    url: string;
    avatar: string; // 确保数据库有这个字段
    description: string;
    email: string;
    status: string;
}

export default function AdminLinksPage() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<LinkItem>>({});

    // 获取数据
    const fetchLinks = async () => {
        const res = await fetch('/api/links?admin=true');
        const data = await res.json();
        setLinks(Array.isArray(data) ? data : []);
    };

    useEffect(() => { fetchLinks(); }, []);

    // 打开编辑/新建窗口
    const openEditor = (link?: LinkItem) => {
        setEditForm(link || { name: "", url: "", avatar: "", description: "", email: "", status: "APPROVED" });
        setIsEditing(true);
    };

    // 保存提交 (新建或更新)
    const handleSave = async () => {
        const method = editForm.id ? 'PUT' : 'POST';
        const url = editForm.id ? `/api/links/${editForm.id}` : '/api/links';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm)
        });

        setIsEditing(false);
        fetchLinks(); // 刷新列表
    };

    const handleDelete = async (id: string) => {
        if (!confirm("确认删除？")) return;
        await fetch(`/api/links/${id}`, { method: 'DELETE' });
        fetchLinks();
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-mono font-bold text-white">LINK_NEXUS</h2>
                <Button onClick={() => openEditor()} className="bg-blue-600 hover:bg-blue-500 font-mono text-xs">
                    <Plus size={14} className="mr-2"/> ADD_NEW_NODE
                </Button>
            </div>

            {/* 列表显示 (代码略简略，主要展示逻辑) */}
            <div className="space-y-4">
                {links.map(link => (
                    <div key={link.id} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black rounded-full overflow-hidden border border-slate-700">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={link.avatar || "/avatar.png"} alt="" className="w-full h-full object-cover"/>
                            </div>
                            <div>
                                <div className="text-white font-bold flex gap-2 items-center">
                                    {link.name}
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${link.status === 'APPROVED' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                        {link.status}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500">{link.url}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => openEditor(link)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-400">
                                <Edit size={14} />
                            </Button>
                            <Button onClick={() => handleDelete(link.id)} size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 编辑/新建 模态框 */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0c0c0c] border border-slate-700 w-full max-w-md rounded-xl p-6 space-y-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-4">
                            {editForm.id ? 'EDIT_NODE' : 'NEW_NODE_ENTRY'}
                        </h3>

                        <input className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white text-sm"
                               placeholder="Site Name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />

                        <input className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white text-sm"
                               placeholder="URL (https://...)" value={editForm.url} onChange={e => setEditForm({...editForm, url: e.target.value})} />

                        <input className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white text-sm"
                               placeholder="Avatar URL" value={editForm.avatar} onChange={e => setEditForm({...editForm, avatar: e.target.value})} />

                        <textarea className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-white text-sm h-20"
                                  placeholder="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />

                        <div className="flex gap-2 justify-end mt-4">
                            <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-gray-400">CANCEL</Button>
                            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white">SAVE_CHANGES</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}