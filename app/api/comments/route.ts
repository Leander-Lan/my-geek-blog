import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import UAParser from "ua-parser-js";
import { auth } from "@/auth";
import crypto from "crypto"; // 👈 现在这个会变亮，因为我们在下面使用了它

// GET: 获取指定文章的评论列表
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: 'desc' }, // 最新的评论在上面
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

// POST: 提交新评论
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { content, email, postId, nickname } = body;

        // 1. 基本验证
        if (!content || !email || !postId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 2. 处理 Gravatar 头像 (使用原生 crypto)
        // 逻辑：去除空格 -> 转小写 -> 生成 MD5 -> 转十六进制字符串
        const emailHash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');

        // d=retro 表示复古像素头像 (你也可以改回 mp, identicon, robohash 等)
        const avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=retro&s=100`;

        // 3. 获取并解析 User Agent (操作系统和浏览器)
        const userAgentString = request.headers.get('user-agent') || "";
        const parser = new UAParser(userAgentString);
        const os = `${parser.getOS().name || 'Unknown OS'} ${parser.getOS().version || ''}`;
        const browser = `${parser.getBrowser().name || 'Unknown Browser'} ${parser.getBrowser().version || ''}`;

        // 4. 获取 IP 地址
        let ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
        if (ip.includes(',')) {
            ip = ip.split(',')[0].trim();
        }
        // 简单的脱敏处理 (针对 IPv4)
        if(ip !== "Unknown IP" && ip.includes('.')) {
            ip = ip.split('.').slice(0, 3).join('.') + '.*';
        }

        // 5. 保存到数据库
        const newComment = await prisma.comment.create({
            data: {
                content,
                email,
                nickname: nickname || "Anonymous Geek",
                postId,
                avatarUrl,
                os,
                browser,
                ip
            }
        });

        return NextResponse.json(newComment);

    } catch (error) {
        console.error("Failed to create comment:", error);
        return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 });
    }
}

// DELETE: 删除评论 (管理员)
export async function DELETE(request: Request) {
    try {
        // 🔒 权限检查：只有登录用户(管理员)才能删除
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 401 });
        }

        // 获取要删除的评论 ID
        const { searchParams } = new URL(request.url);
        const commentId = searchParams.get('id');

        if (!commentId) {
            return NextResponse.json({ error: "Comment ID required" }, { status: 400 });
        }

        // 执行删除
        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        return NextResponse.json({ message: "Comment deleted successfully", deletedId: commentId });

    } catch (error) {
        console.error("Failed to delete comment:", error);
        if ((error as any).code === 'P2025') {
            return NextResponse.json({ error: "Comment not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
    }
}