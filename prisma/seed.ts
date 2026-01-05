import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // --- 在这里设置你的管理员账号和密码 ---
    const adminUsername = 'Leander' // 你的登录用户名
    const adminPassword = 'Lan20060703' // 你的明文密码
    // ----------------------------------

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const user = await prisma.user.upsert({
        where: { username: adminUsername },
        update: {},
        create: {
            username: adminUsername,
            password: hashedPassword,
            name: '管理员',
        },
    })

    console.log('✅ 管理员账号初始化成功:', user.username)
}

main()
    .catch((e) => {
        console.error('❌ 初始化失败:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })