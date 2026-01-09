import { prisma } from "@/lib/prisma";
import AdminPageHeader from "../components/AdminPageHeader";
import { MessageSquare, Trash2, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteCommentButton from "./DeleteCommentButton"; // 下一步创建

// 强制动态渲染，确保看到最新数据
export const dynamic = 'force-dynamic';

async function getComments() {
    // 获取所有评论，并包含关联的文章标题
    const comments = await prisma.comment.findMany({
        include: {
            post: {
                select: { title: true, id: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    return comments;
}

export default async function AdminCommentsPage() {
    const comments = await getComments();

    return (
        <div className="space-y-6">
            <AdminPageHeader
                icon={MessageSquare}
                title="Comments Management"
                description={`Total ${comments.length} comments across all posts.`}
            />

            <div className="bg-[#0c0c0c] border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-400 font-mono uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Author</th>
                            <th className="p-4">Comment</th>
                            <th className="p-4">On Post</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                        {comments.map((comment) => (
                            <tr key={comment.id} className="hover:bg-white/5 transition-colors group">
                                {/* 作者信息 */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        {comment.avatarUrl && (
                                            <Image src={comment.avatarUrl} alt={comment.nickname || 'User'} width={32} height={32} className="rounded-full border border-white/10" />
                                        )}
                                        <div>
                                            <div className="font-bold text-white">{comment.nickname}</div>
                                            <div className="text-xs text-gray-500 font-mono">{comment.email}</div>
                                            <div className="text-xs text-gray-600 font-mono mt-1">{comment.ip}</div>
                                        </div>
                                    </div>
                                </td>
                                {/* 评论内容 */}
                                <td className="p-4 max-w-xs md:max-w-md">
                                    <p className="text-gray-300 line-clamp-3 whitespace-pre-wrap text-xs md:text-sm" title={comment.content}>
                                        {comment.content}
                                    </p>
                                    <div className="text-[10px] text-gray-600 mt-2 font-mono flex gap-2">
                                        {comment.os && <span>[{comment.os}]</span>}
                                        {comment.browser && <span>[{comment.browser}]</span>}
                                    </div>
                                </td>
                                {/* 所属文章 */}
                                <td className="p-4">
                                    <Link href={`/blog/${comment.post.id}`} target="_blank" className="flex items-center gap-1 text-green-500 hover:underline max-w-[150px] truncate">
                                        <ExternalLink size={12}/>
                                        {comment.post.title}
                                    </Link>
                                </td>
                                {/* 日期 */}
                                <td className="p-4 text-gray-500 font-mono text-xs whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12}/>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </div>
                                    <div>{new Date(comment.createdAt).toLocaleTimeString()}</div>
                                </td>
                                {/* 操作按钮 */}
                                <td className="p-4 text-right">
                                    <DeleteCommentButton commentId={comment.id} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {comments.length === 0 && (
                        <div className="text-center py-10 text-gray-500 font-mono">No comments found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}