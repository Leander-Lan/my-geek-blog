"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCommentButton({ commentId }: { commentId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("⚠️ Are you sure you want to delete this comment permanently?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/comments?id=${commentId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // 删除成功后刷新页面，显示最新数据
                router.refresh();
            } else {
                alert("Failed to delete comment.");
            }
        } catch (error) {
            alert("Error occurred.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
            title="Delete Permanently"
        >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
}