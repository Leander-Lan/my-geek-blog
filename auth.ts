import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 1. 这里调成 30 天，只要 30 天内访问过，就不用重新登录
        updateAge: 24 * 60 * 60,   // 2. 每天自动延长一次有效期
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username as string }
                })

                if (!user || !user.password) return null

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!isPasswordValid) return null

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.username
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // 建议在这里也检查一下，确保没有逻辑强制你退出
        async session({ session, token }) {
            if (token?.sub && session.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
})