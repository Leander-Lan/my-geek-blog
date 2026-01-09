import { LucideIcon } from "lucide-react";

interface AdminPageHeaderProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function AdminPageHeader({ icon: Icon, title, description }: AdminPageHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Icon className="text-blue-400" size={24} />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight font-mono">{title}</h1>
            </div>
            <p className="text-gray-500 text-sm font-mono border-l-2 border-blue-900/50 pl-3 ml-1">
                {description}
            </p>
        </div>
    );
}