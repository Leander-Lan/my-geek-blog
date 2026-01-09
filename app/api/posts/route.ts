import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

// ⚠️ 强制接口动态，防止缓存
export const dynamic = "force-dynamic";

// 1. GET: 获取文章列表
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(posts || [])
    } catch (error) {
        console.error("GET_POSTS_ERROR:", error)
        return NextResponse.json([], { status: 500 })
    }
}

// 2. POST: 发布新文章 (升级版：支持标签、分类、封面图)
export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()

        // 👇 解构所有新字段
        const { title, content, category, coverImage, tags, published } = body

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                // 👇 存入新字段 (如果前端没传，就是 undefined，Prisma 会处理)
                category: category || "Tech",
                published: Boolean(published),
                coverImage: coverImage || "",
                tags: tags || ""
            }
        })

        return NextResponse.json(newPost)
    } catch (error) {
        console.error("CREATE_ERROR:", error)
        return NextResponse.json({ error: "Create failed" }, { status: 500 })
    }
}