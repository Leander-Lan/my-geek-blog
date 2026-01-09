"use client";

import Link from "next/link";
import { Mail, Github, Gamepad2, GraduationCap, Palette, Terminal, Cpu } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader"; // 👈 补上导航栏

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono relative overflow-hidden">

            {/* 1. 补上导航栏，否则这页没法跳转 */}
            <SiteHeader />

            {/* 背景装饰 */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            {/* pt-32 留出顶部导航栏的距离 */}
            <main className="max-w-4xl mx-auto relative z-10 pt-32 pb-20 px-6">

                {/* 👇👇👇 使用动画组件包裹内容 */}
                <PageTransition>
                    {/* 👇 这里加个 div 承载 space-y-16，保证间距不变 */}
                    <div className="space-y-16">

                        {/* 1. 头部介绍 */}
                        <section className="space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                Hi, I'm <span className="text-green-500">Leander</span>.
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                                Design Student / Gamer
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 border border-blue-500/20 flex items-center gap-2">
                                     <GraduationCap size={14}/> 南京林业大学
                                </span>
                                <span className="px-3 py-1 rounded-full bg-purple-900/20 text-purple-400 border border-purple-500/20">
                                    年龄: 19
                                </span>
                            </div>
                        </section>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* 2. 详细介绍 */}
                        <div className="grid md:grid-cols-2 gap-12">

                            {/* 左侧：专业能力 */}
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Palette className="text-yellow-500" /> 专业技能
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    我目前是的大二学生。<strong className="text-gray-300">环境设计专业</strong>.
                                    专攻空间设计与可视化。
                                </p>

                                <div className="space-y-3">
                                    <SkillBar name="Adobe Photoshop (PS)" percent={85} />
                                    <SkillBar name="Adobe Illustrator (AI)" percent={80} />
                                    <SkillBar name="Autodesk AutoCAD" percent={75} />
                                    <SkillBar name="Trimble SketchUp (SU)" percent={80} />
                                    <SkillBar name="D5 Render" percent={70} />
                                    <SkillBar name="Microsoft 365 / WPS Office" percent={90} />
                                </div>
                            </section>

                            {/* 右侧：爱好与游戏 */}
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Gamepad2 className="text-red-500" /> 游戏与爱好
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    当我不在学习时，通常在这些游戏里拯救（或摧毁）世界=)。
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <GameCard title="Apex Legends" role="Battle Royale" />
                                    <GameCard title="Overwatch" role="FPS" />
                                    <GameCard title="Destiny 2" role="MMO Shooter" />
                                    <GameCard title="Minecraft" role="Sandbox" />
                                </div>

                                <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Terminal size={16} className="text-green-500"/> Web Development
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        偶尔会调整这个博客。我真的会好好学习代码的（真的吗）。
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* 3. 联系方式 */}
                        <section className="pt-8 border-t border-slate-800 text-center">
                            <h2 className="text-2xl font-bold text-white mb-8">联系方式</h2>
                            <div className="flex justify-center gap-6">
                                <a href="mailto:me@tianiel.top" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                                    <Mail size={20} className="group-hover:text-green-400 transition-colors"/>
                                    <span>me@tianiel.top</span>
                                </a>
                                <Link href="https://github.com/Leander-Lan" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                                    <Github size={20} className="group-hover:text-white transition-colors"/>
                                    <span>Github</span>
                                </Link>
                            </div>
                        </section>

                    </div>
                </PageTransition>
            </main>
        </div>
    );
}

// 辅助组件：技能条
function SkillBar({ name, percent }: { name: string; percent: number }) {
    return (
        <div className="group">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300 group-hover:text-white transition-colors">{name}</span>
                <span className="text-gray-600 font-mono">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

// 辅助组件：游戏卡片
function GameCard({ title, role }: { title: string; role: string }) {
    return (
        <div className="p-3 bg-[#0a0a0a] border border-slate-800 rounded-lg hover:border-red-500/30 transition-colors">
            <div className="font-bold text-gray-200 text-sm">{title}</div>
            <div className="text-[10px] text-gray-600 mt-1 font-mono">{role}</div>
        </div>
    );
}