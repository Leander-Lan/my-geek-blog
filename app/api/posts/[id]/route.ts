import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    // 1. 【增加在这里】：校验逻辑
    const token = request.headers.get('Authorization');
    if (token !== process.env.ADMIN_TOKEN) {
        return NextResponse.json({ error: '无权删除' }, { status: 401 });
    }

    // 2. 校验通过，执行删除
    try {
        await prisma.post.delete({ where: { id: params.id } });
        return NextResponse.json({ message: '已成功删除文章' });
    } catch (error) {
        return NextResponse.json({ error: '删除失败' }, { status: 500 });
    }
}