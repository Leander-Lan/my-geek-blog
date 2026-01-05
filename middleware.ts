// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // 如果已登录还想去登录页，直接送回后台
    if (pathname === "/login" && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }

    // 未登录去后台，送去登录
    if (pathname.startsWith("/admin") && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ["/admin/:path*", "/login"], // 增加对 /login 的监听
}