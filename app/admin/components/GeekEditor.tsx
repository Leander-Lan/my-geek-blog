"use client";

import { useRef } from "react";
import {
    Bold,
    Italic,
    List,
    Image as ImageIcon,
    Link as LinkIcon,
    Code,
    AlignCenter,
    Heading1,
    Heading2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface GeekEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function GeekEditor({ value, onChange }: GeekEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 核心逻辑：在光标位置插入文本
    const insertText = (before: string, after: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;
        const selectedText = currentText.substring(start, end);

        const newText =
            currentText.substring(0, start) +
            before + selectedText + after +
            currentText.substring(end);

        onChange(newText);

        // 重新聚焦并恢复光标位置
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    return (
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-[#0c0c0c] flex flex-col h-[500px]">

            {/* 1. 工具栏 */}
            <div className="flex items-center gap-1 p-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto">
                <ToolButton icon={<Bold size={14}/>} label="Bold" onClick={() => insertText("**", "**")} />
                <ToolButton icon={<Italic size={14}/>} label="Italic" onClick={() => insertText("*", "*")} />
                <div className="w-px h-4 bg-slate-700 mx-1" />

                <ToolButton icon={<Heading1 size={14}/>} label="H1" onClick={() => insertText("# ", "")} />
                <ToolButton icon={<Heading2 size={14}/>} label="H2" onClick={() => insertText("## ", "")} />
                <div className="w-px h-4 bg-slate-700 mx-1" />

                <ToolButton icon={<AlignCenter size={14}/>} label="Center" onClick={() => insertText("<center>", "</center>")} />
                <ToolButton icon={<List size={14}/>} label="List" onClick={() => insertText("- ", "")} />
                <ToolButton icon={<Code size={14}/>} label="Code" onClick={() => insertText("```\n", "\n```")} />
                <div className="w-px h-4 bg-slate-700 mx-1" />

                <ToolButton icon={<LinkIcon size={14}/>} label="Link" onClick={() => insertText("[链接文字](", ")")} />
                <ToolButton icon={<ImageIcon size={14}/>} label="Image" onClick={() => insertText("![图片描述](", ")")} />
            </div>

            {/* 2. 编辑区 (原生 Textarea，性能最好) */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 w-full bg-[#0c0c0c] p-4 text-slate-300 font-mono text-sm leading-relaxed resize-none focus:outline-none selection:bg-green-900/50 placeholder:text-slate-700"
                placeholder="# 开始你的创作...

提示：
1. 点击上方按钮可快速插入格式
2. 支持 Markdown 语法
3. 居中请使用 Center 按钮"
            />

            {/* 3. 底部状态栏 */}
            <div className="px-4 py-2 bg-slate-900/30 text-[10px] text-slate-600 font-mono border-t border-slate-800 flex justify-between">
                <span>MARKDOWN_MODE :: RAW_INPUT</span>
                <span>LEN: {value.length} CHARS</span>
            </div>
        </div>
    );
}

// 辅助组件：工具栏按钮
function ToolButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors group relative"
            title={label}
        >
            {icon}
        </button>
    );
}