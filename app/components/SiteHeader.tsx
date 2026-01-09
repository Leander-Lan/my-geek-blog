"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // 引入搜索图标

export default function SiteHeader() {
    const pathname = usePathname();

    // 特定页面隐藏导航栏
    if (pathname.startsWith("/admin") || pathname === "/login") return null;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Friends', path: '/links' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Privacy', path: '/privacy' } // 👈 已添加 Privacy
    ];

    return (
        // 外层容器：负责定位到顶部中间
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">

            {/* 内层胶囊：负责样式 (背景、边框、圆角) */}
            {/* pointer-events-auto 确保点击事件生效，因为外层禁用了点击以防遮挡 */}
            <div className="pointer-events-auto flex items-center gap-6 md:gap-8 px-6 py-3 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20">

                {/* 1. 左侧：红黄绿状态灯 */}
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
                </div>

                {/* 分割线 */}
                <div className="w-px h-4 bg-white/10 hidden md:block" />

                {/* 2. 中间：导航菜单 */}
                <nav className="flex items-center gap-6 text-sm font-medium font-mono">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`relative group transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <span className="relative z-10">~/{item.name}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill-underline"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* 分割线 */}
                <div className="w-px h-4 bg-white/10 hidden md:block" />

                {/* 3. 右侧：搜索图标 (装饰用) */}
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Search size={16} />
                </button>
            </div>
        </header>
    );
}