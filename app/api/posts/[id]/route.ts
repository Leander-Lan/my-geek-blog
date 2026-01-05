import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // 1. 权限校验
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        // 2. 获取并转换 ID
        const { id } = await context.params;

        // 关键修复：既然日志报错缺少 id 或类型不对，我们在这里强制转换
        const postId = parseInt(id);

        if (isNaN(postId)) {
            console.error("INVALID_ID_RECEIVED:", id);
            return NextResponse.json({ error: 'INVALID_ID_FORMAT' }, { status: 400 });
        }

        // 3. 执行删除操作
        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("DELETE_POST_ERROR:", error);
        return NextResponse.json(
            { error: 'DELETE_FAILED', detail: error.message },
            { status: 500 }
        );
    }
} // <--- 这里的括号必须闭合 DELETE 函数