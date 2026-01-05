import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' }
        })

        // 核心修复：确保 posts 即使为 null/undefined 也会变成空数组
        const safePosts = posts || []

        return NextResponse.json(safePosts)
    } catch (error) {
        console.error("API_GET_POSTS_ERROR:", error)
        // 报错时返回空数组，防止构建工具崩溃
        return NextResponse.json([], { status: 500 })
    }
}

// 如果你还有 POST 方法，确保它逻辑完整
export async function POST(req: Request) {
    try {
        const { title, content } = await req.json()
        const newPost = await prisma.post.create({
            data: { title, content }
        })
        return NextResponse.json(newPost)
    } catch (error) {
        return NextResponse.json({ error: "FAILED_TO_CREATE_POST" }, { status: 500 })
    }
}