import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

// GET: 获取友链列表
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true'; // 简单区分

    try {
        // 如果是后台请求，查所有；如果是前台，只查已通过的
        const whereCondition = isAdmin ? {} : { status: "APPROVED" };

        const links = await prisma.link.findMany({
            where: whereCondition,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(links);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

// POST: 申请友链 (游客) 或 添加友链 (管理员)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, url, avatar, description, email } = body;

        // 简单校验
        if (!name || !url || !email) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // 检查是否是管理员直接添加
        const session = await auth();
        const status = session ? "APPROVED" : "PENDING"; // 登录就是直接通过，没登录就是待审核

        const newLink = await prisma.link.create({
            data: { name, url, avatar, description, email, status }
        });

        return NextResponse.json(newLink);
    } catch (error) {
        return NextResponse.json({ error: "Submit failed" }, { status: 500 });
    }
}