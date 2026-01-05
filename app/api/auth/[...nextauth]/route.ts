// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"

// 强制标记为动态路由，防止构建时预渲染尝试连接数据库或读取不存在的配置
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export const { GET, POST } = handlers