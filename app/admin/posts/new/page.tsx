"use client"
import { useState } from "react"
import { StarsBackground } from "@/components/animate-ui/stars-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function NewPostPage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isPublishing, setIsPublishing] = useState(false)
    const [statusMsg, setStatusMsg] = useState("")
    const router = useRouter()

    const handlePublish = async () => {
        if (!title || !content) {
            setStatusMsg("ERROR: NULL_CONTENT_DETECTED")
            return
        }

        setIsPublishing(true)
        setStatusMsg("INITIATING_PUBLISH_SEQUENCE...")

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            })

            if (response.ok) {
                setStatusMsg("SUCCESS: DATA_WRITTEN_TO_DATABASE")
                setTimeout(() => {
                    router.push("/")
                    router.refresh()
                }, 1500)
            } else {
                const err = await response.json()
                setStatusMsg(`FAILURE: ${err.error || "UNKNOWN_SYSTEM_ERROR"}`)
            }
        } catch (e) {
            setStatusMsg("CRITICAL: NETWORK_CONNECTION_FAILED")
        } finally {
            setIsPublishing(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-3xl mx-auto space-y-6"
            >
                <header className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h1 className="text-xl font-mono text-blue-400 font-bold">
                        {">"} NEW_POST_ENTRY
                    </h1>
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="font-mono text-xs border-slate-700 text-slate-400 hover:bg-slate-900"
                    >
                        [ESC_BACK]
                    </Button>
                </header>

                <div className="space-y-4 bg-slate-900/40 p-6 rounded-lg border border-slate-800 backdrop-blur-sm shadow-2xl">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-blue-300 flex justify-between">
                            <span>OBJECT_TITLE</span>
                        </label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="输入文章标题..."
                            className="bg-slate-950 border-slate-700 font-mono text-blue-100"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-blue-300 flex justify-between">
                            <span>CONTENT_BUFFER</span>
                        </label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="在这里输入内容..."
                            className="min-h-[400px] bg-slate-950 border-slate-700 font-mono text-blue-100 resize-none"
                        />
                    </div>

                    {statusMsg && (
                        <div className={`text-[10px] font-mono p-2 rounded border ${
                            statusMsg.includes("SUCCESS")
                                ? "border-green-900/50 bg-green-950/20 text-green-400"
                                : "border-blue-900/50 bg-blue-950/20 text-blue-400"
                        }`}>
                            {">"} {statusMsg}
                        </div>
                    )}

                    <Button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="w-full bg-blue-600 hover:bg-blue-500 font-mono tracking-widest transition-all"
                    >
                        {isPublishing ? "DATA_UPLOADING..." : "EXECUTE_PUBLISH_SEQUENCE"}
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}