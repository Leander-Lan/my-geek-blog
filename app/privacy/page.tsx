"use client";

import Link from "next/link";
import { Shield, Server, Lock, Eye, Globe } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono relative overflow-hidden">

            {/* 1. 补上导航栏 */}
            <SiteHeader />

            {/* 背景装饰 */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <main className="max-w-3xl mx-auto relative z-10 pt-32 pb-20 px-6">

                {/* 👇👇👇 加上动画包裹 */}
                <PageTransition>
                    <div className="prose prose-invert prose-headings:font-mono prose-headings:font-bold prose-p:text-gray-400 prose-li:text-gray-400 max-w-none">

                        <div className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                                <Shield className="text-green-500" /> 隐私政策 (Privacy Policy)
                            </h1>
                            <p className="text-sm text-gray-500">
                                生效日期: 2026年1月5日 <br/>
                                最后更新: 2026年1月6日
                            </p>
                        </div>

                        <section>
                            <p>
                                欢迎访问 <strong>tianiel.top</strong>（以下简称“本站”）。我们深知隐私对您的重要性，特别是作为一名技术爱好者，我们承诺以透明、安全的方式处理您的数据。
                            </p>
                            <p>
                                本政策详细说明了当您使用本站的博客评论、友链申请等功能时，我们如何收集和处理您的信息。
                            </p>
                        </section>

                        <h3>1. 我们收集的信息类型</h3>
                        <p>为了提供互动功能，我们需要收集以下特定信息：</p>

                        <div className="bg-[#0a0a0a] border border-slate-800 rounded-lg p-4 my-4 not-prose space-y-4">
                            <div className="flex gap-4">
                                <div className="p-2 bg-blue-900/20 rounded h-fit"><Globe size={20} className="text-blue-400"/></div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">友链申请数据</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        当您申请友链时，我们会收集您的<strong>网站名称、URL、描述、Logo 地址</strong>以及<strong>联系邮箱</strong>。这些信息将公开展示在友链页面（邮箱除外）。
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2 bg-purple-900/20 rounded h-fit"><Eye size={20} className="text-purple-400"/></div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">评论数据</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        当您发表评论时，我们会收集您的<strong>昵称、邮箱、评论内容</strong>。
                                        为了防止垃圾评论和安全审计，系统会自动记录您的 <strong>IP 地址</strong> 和 <strong>User-Agent (浏览器/操作系统信息)</strong>。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h3>2. 信息的公开与隐藏</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>公开信息：</strong> 您的昵称、网站链接、评论内容以及友链的公开描述将在网站上对所有人可见。</li>
                            <li><strong>私密信息：</strong> 您的<strong>电子邮箱地址</strong>和<strong>IP 地址</strong>将被严格保密，不会在前台直接显示。</li>
                        </ul>

                        <h3>3. 第三方服务与头像 (Gravatar)</h3>
                        <p>
                            本站使用 <strong>Gravatar</strong> 服务来显示用户头像。
                        </p>
                        <div className="p-4 border-l-4 border-green-500 bg-green-900/10 my-4">
                            <p className="text-sm m-0">
                                <strong>处理逻辑：</strong> 当您留下邮箱时，我们会将您的邮箱地址进行去空格和小写处理，然后生成 MD5 哈希值，并发送给 Gravatar 以获取您的公开头像。此过程不可逆，我们不会向 Gravatar 泄露您的原始邮箱，但在请求头像时 Gravatar 可能会获取您的 IP 地址。
                            </p>
                        </div>

                        <h3>4. Cookie 和本地存储</h3>
                        <p>
                            我们仅使用必要的 Cookie 来维持管理员的登录状态（基于 NextAuth.js）。普通访客浏览时，本站不会植入任何用于广告追踪的 Cookie。
                        </p>

                        <h3>5. 数据存储与安全</h3>
                        <div className="flex items-start gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg not-prose mb-6">
                            <Server className="text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">数据库安全</h4>
                                <p className="text-xs text-gray-500">
                                    您的数据存储在受保护的数据库中。对于评论中记录的 IP 地址，我们在入库前会进行简单的脱敏处理（隐藏最后一段），以最大限度保护您的隐私。
                                </p>
                            </div>
                        </div>

                        <h3>6. 您的权利 (删除与修改)</h3>
                        <p>
                            如果您希望删除您在本站留下的评论或友链信息，或者发现信息有误，请通过下方邮件联系我。在核实身份（使用您留言时的邮箱发送请求）后，我会在 72 小时内手动处理。
                        </p>

                        <h3>7. 联系站长</h3>
                        <p>
                            如有任何隐私相关问题，请发送邮件至：
                            <a href="mailto:me@tianiel.top" className="text-green-400 no-underline hover:underline ml-1">
                                me@tianiel.top
                            </a>
                        </p>

                        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                            <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors group">
                                <span className="group-hover:-translate-x-1 inline-block transition-transform">&lt;-</span> 返回首页 (Return to Home)
                            </Link>
                        </div>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
}