"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
    const pathname = usePathname();

    // ❌ 如果是后台管理或登录页，不显示页脚
    if (pathname.startsWith("/admin") || pathname === "/login") return null;

    return (
        <footer className="w-full py-8 border-t border-white/5 bg-[#050505] text-center text-xs relative z-10">
            <div className="max-w-6xl mx-auto px-6 space-y-4">

                {/* 1. 原有的版权信息 */}
                <div className="text-gray-600 font-mono">
                    <p>&copy; 2026 Leander_Dev. All systems nominal.</p>
                    <p className="mt-2 flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-900 animate-pulse"></span>
                        Powered by Next.js & Coffee
                    </p>
                </div>

                {/* 2. 备案信息区域 (Flex 布局居中) */}
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 pt-2">

                    {/* (1) ICP 备案 */}
                    <FilingItem
                        href="https://beian.miit.gov.cn/#/Integrated/index"
                        icon="/icons/icp.png" // ⚠️ 记得在 public/icons 放图片
                        text="苏ICP备2025203869号-1"
                    />

                    {/* (2) 公安网备 */}
                    <FilingItem
                        href="https://beian.mps.gov.cn/#/query/webSearch"
                        icon="/icons/gongan.png"
                        text="苏公网安备32111102000680号"
                    />

                    {/* (3) 萌ICP (Moe ICP) */}
                    <FilingItem
                        href="https://icp.gov.moe/?keyword=tianiel.top"
                        icon="/icons/moe.png"
                        text="萌ICP备20253211号"
                    />
                </div>
            </div>
        </footer>
    );
}

// 辅助组件：单个备案条目 (封装了悬浮变色逻辑)
function FilingItem({ href, icon, text }: { href: string, icon: string, text: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="group flex items-center gap-1.5 transition-colors"
        >
            {/* 图标：默认灰度+半透明，悬浮时恢复彩色+不透明 */}
            <div className="relative w-4 h-4 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <Image
                    src={icon}
                    alt="icon"
                    fill
                    className="object-contain"
                />
            </div>
            {/* 文字：默认深灰，悬浮变浅灰 */}
            <span className="text-gray-700 group-hover:text-gray-400 font-mono">
                {text}
            </span>
        </Link>
    );
}