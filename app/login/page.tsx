"use client"
import { useState } from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { StarsBackground } from "@/components/animate-ui/stars-background"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false, // 禁用自动跳转，由我们手动控制
            })

            if (res?.error) {
                setError("AUTH_ERR: ACCESS_DENIED_INVALID_KEY")
                setIsLoading(false)
            } else {
                // 登录成功，执行强制刷新并跳转
                router.push('/admin')
                router.refresh()
            }
        } catch (err) {
            setError("SYSTEM_ERR: CONNECTION_INTERRUPTED")
            setIsLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <StarsBackground />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 w-full max-w-md px-4"
            >
                <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-2xl text-slate-100 shadow-2xl">
                    <CardHeader className="text-center font-mono">
                        <CardTitle className="text-2xl text-blue-400 font-bold tracking-[0.2em]">
                            SYSTEM_AUTH
                        </CardTitle>
                        <CardDescription className="text-slate-500 text-[10px] mt-2 tracking-widest uppercase">
                            Secure encrypted terminal link
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <Label className="text-[10px] text-blue-300/70 font-mono ml-1">USER_IDENTIFIER</Label>
                                <Input
                                    type="text"
                                    placeholder="ID_REQUIRED"
                                    className="bg-slate-950/80 border-slate-800 text-blue-100 font-mono focus:border-blue-500/50 transition-all"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] text-blue-300/70 font-mono ml-1">ACCESS_PASSCODE</Label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-slate-950/80 border-slate-800 text-blue-100 font-mono focus:border-blue-500/50 transition-all"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-red-400 text-[9px] font-mono p-2 border border-red-900/30 bg-red-950/10 rounded flex items-center"
                                    >
                                        <span className="mr-2">⚠️</span> {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-600 text-white font-mono h-11 tracking-widest active:scale-95 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? "ESTABLISHING..." : "INITIATE_LOGIN"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}