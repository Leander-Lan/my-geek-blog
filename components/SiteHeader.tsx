"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // 引入 AnimatePresence 做进出动画
import { Search, Menu, X } from "lucide-react"; // 引入菜单和关闭图标
import { useState } from "react"; // 引入状态管理

export default function SiteHeader() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制移动端菜单开关

    // 特定页面隐藏导航栏
    if (pathname.startsWith("/admin") || pathname === "/login") return null;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Friends', path: '/links' },
        { name: 'About', path: '/about' },
        { name: 'Privacy', path: '/privacy' }
    ];

    return (
        // 外层容器：负责定位到顶部中间
        // 修改：改为 flex-col 以便让移动端下拉菜单垂直排列在胶囊下方
        <header className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4">

            {/* 内层胶囊：主导航栏 */}
            <div className="pointer-events-auto flex items-center justify-between md:justify-start gap-4 md:gap-8 px-5 py-3 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20 relative z-50">

                {/* 1. 左侧：红黄绿状态灯 (移动端保持显示，作为装饰) */}
                <div className="flex gap-2 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
                </div>

                {/* 分割线 (仅 PC 显示) */}
                <div className="w-px h-4 bg-white/10 hidden md:block" />

                {/* 2. 中间：导航菜单 (PC 端显示，移动端隐藏) */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium font-mono">
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

                {/* 分割线 (仅 PC 显示) */}
                <div className="w-px h-4 bg-white/10 hidden md:block" />

                {/* 3. 右侧区域 */}
                <div className="flex items-center gap-4">
                    {/* 搜索图标 */}
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Search size={16} />
                    </button>

                    {/* 🆕 移动端汉堡按钮 (仅移动端显示 md:hidden) */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* 🆕 4. 移动端下拉菜单 (独立的小胶囊) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto md:hidden mt-2 w-48 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col py-2"
                    >
                        {navItems.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)} // 点击后关闭菜单
                                    className={`px-6 py-3 text-sm font-mono transition-colors flex items-center gap-2 ${
                                        isActive
                                            ? 'text-white bg-white/5 border-l-2 border-green-500'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span>~/{item.name}</span>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}