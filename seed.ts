import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const post = await prisma.post.create({
            data: {
                title: '终于成功了！Hello World',
                content: '这是我通过脚本直接写入数据库的第一篇文章！Next.js 全栈开发太酷了。',
                category: 'Code',
                // 关键点：我们不填 createdAt，让数据库自己生成，这样就绝对不会错！
            },
        })
        console.log('✅ 写入成功！文章ID:', post.id)
    } catch (e) {
        console.error('❌ 写入失败：', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()