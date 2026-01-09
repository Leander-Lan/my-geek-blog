import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-mono flex flex-col items-center justify-center relative overflow-hidden">
            {/* 背景纹理 */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="relative z-10 text-center space-y-6 px-4">
                <h1 className="text-9xl font-bold text-white/10 select-none">404</h1>

                <div className="space-y-2">
                    <h2 className="text-2xl text-white font-bold text-red-500">
                        ERR_PAGE_NOT_FOUND
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        The requested resource could not be found on this server. <br/>
                        It might have been moved, deleted, or never existed.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-500/50 text-green-500 rounded transition-all group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">&lt;-</span>
                        <span>return_home()</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}