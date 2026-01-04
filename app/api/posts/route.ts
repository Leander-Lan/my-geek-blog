import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        // 1. 【增加在这里】：获取请求头里的暗号 (Token)
        const token = request.headers.get('Authorization');

        // 2. 校验：如果暗号不对，直接返回 401 错误，不执行后面的代码
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: '未经授权的访问' }, { status: 401 });
        }

        // 3. 校验通过，开始原来的逻辑
        const body = await request.json();
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: true,
            },
        });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: '创建失败' }, { status: 500 });
    }
}