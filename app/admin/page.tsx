import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
    // 获取真实数据
    const postCount = await prisma.post.count();
    // 暂时模拟其他数据（后续可扩展数据库字段）
    const views = 1204;
    const comments = 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-mono font-bold text-white">DASHBOARD_OVERVIEW</h2>
                <span className="text-xs font-mono text-green-400 animate-pulse">● SYSTEM_ONLINE</span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard title="TOTAL_POSTS" value={postCount} icon="📝" color="text-blue-400" />
                <StatsCard title="TOTAL_VIEWS" value={views} icon="👁️" color="text-purple-400" />
                <StatsCard title="COMMENTS" value={comments} icon="💬" color="text-green-400" />
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/30">
                <h3 className="text-sm font-mono text-slate-400 mb-4">SYSTEM_LOGS</h3>
                <div className="font-mono text-xs text-slate-500 space-y-2">
                    <p>[{new Date().toLocaleTimeString()}] Admin module loaded successfully.</p>
                    <p>[INFO] Database connection established via Prisma Client.</p>
                    <p>[INFO] Waiting for user input...</p>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, color }: any) {
    return (
        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-mono text-slate-400">
                    {title}
                </CardTitle>
                <span className="text-xl">{icon}</span>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
            </CardContent>
        </Card>
    );
}