import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

// 1. GET: 获取单篇文章详情 (用于回显)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const post = await prisma.post.findUnique({
            where: { id } // 字符串 ID 直接查
        });

        if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}

// 2. PUT: 更新文章 (核心功能)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await request.json(); // 获取前端传来的新数据

        // 提取需要更新的字段
        const { title, content, category, coverImage, tags, published } = body;

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                category,
                published: Boolean(published),
                coverImage,
                tags
            }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("UPDATE_ERROR:", error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

// 3. DELETE: 删除文章 (保持不变)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        await prisma.post.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}