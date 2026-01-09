import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 👇👇👇 核心检查点：这行代码必须有！没有就会报 ReferenceError 👇👇👇
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
// 👆👆👆 必须有！ 👆👆👆

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-mono'
});

export const metadata: Metadata = {
    title: "Leander's Blog",
    description: "A geek blog built with Next.js",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <body className={`${inter.className} ${jetbrainsMono.variable} antialiased bg-[#050505] text-gray-300`}>
        {/* 顶部导航 */}
        <SiteHeader />

        {/* 页面主体 */}
        {children}

        {/* 底部页脚 */}
        <SiteFooter />
        </body>
        </html>
    );
}