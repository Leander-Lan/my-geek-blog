import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StarsBackground } from "@/components/animate-ui/stars-background";
import AdminSidebar from "./components/AdminSidebar"; // 下一步创建这个组件

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex overflow-hidden">
            {/* 0. 全局背景 (只会加载一次，不闪烁) */}
            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>

            {/* 1. 左侧导航栏 (Z-Index 需高于背景) */}
            <aside className="relative z-20 w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex-shrink-0">
                <AdminSidebar user={session.user} />
            </aside>

            {/* 2. 右侧内容区 */}
            <main className="relative z-10 flex-1 overflow-y-auto h-screen p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}