"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const menuItems = [
    { name: "DASHBOARD [仪表盘]", path: "/admin", icon: "📊" },
    { name: "ARTICLES [文章管理]", path: "/admin/posts", icon: "📝" },
    // 👇 新增：评论管理入口
    { name: "COMMENTS [评论管理]", path: "/admin/comments", icon: "💬" },
    { name: "LINKS [友链管理]", path: "/admin/links", icon: "🔗" },
    { name: "SETTINGS [系统设置]", path: "/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar({ user }: { user: any }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full p-4">
            {/* Logo区 */}
            <div className="mb-8 px-2 pt-2">
                <h1 className="text-xl font-mono font-bold text-blue-400 tracking-tighter">
                    {">"} ADMIN_NEXUS
                </h1>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                    USER: {user?.name || "COMMANDER"}
                </p>
            </div>

            {/* 菜单区 */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}>
                            <div
                                className={`group flex items-center gap-3 px-3 py-3 rounded-lg font-mono text-xs transition-all relative ${
                                    isActive
                                        ? "text-blue-200 bg-blue-900/30 border border-blue-800/50"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-500/10 rounded-lg"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                    />
                                )}
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* 底部退出 */}
            <div className="mt-auto pt-4 border-t border-slate-800">
                <Button
                    variant="destructive"
                    className="w-full font-mono text-xs bg-red-950/50 hover:bg-red-900/80 border border-red-900/50"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    TERMINATE_SESSION
                </Button>
            </div>
        </div>
    );
}