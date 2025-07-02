import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname,origin } = request.nextUrl
    const authCoockies = request.cookies.get("auth_token")?.value
    /* ********************************* */
    
    const publicPaths = ["/signup", "/login"]
    const publicApiPaths = ["/api/order_thap"]
    const publicGetApiPaths = ["/api/thap"]

    /* ********************************* */
    if (publicPaths.includes(pathname)) {
        if (!authCoockies) return NextResponse.next()
        const authResponse = await fetch(`${origin}/api/auth/user/verify`, {
            headers: {
                "Cookie": `auth_token=${authCoockies}`
            }
        })

        if (!authResponse.ok) return NextResponse.next()

        const { user } = await authResponse.json()
        if (!user) return NextResponse.next()
        const headers = new Headers(request.headers)
        headers.set("x-user", JSON.stringify(user))
        return NextResponse.redirect(new URL("/", request.url), { headers })
    } else if (pathname == "/logout") {
        if (!authCoockies) return NextResponse.redirect(new URL("/login", request.url))
        const authResponse = await fetch(`${origin}/api/auth/user/verify`, {
            headers: {
                "Cookie": `auth_token=${authCoockies}`
            }
        })

      

        if (!authResponse.ok) return NextResponse.redirect(new URL("/login", request.url))

        const { user } = await authResponse.json()
        if (!user) return NextResponse.redirect(new URL("/login", request.url))
        const cookieStore = await cookies()
        cookieStore.delete("auth_token")
        return NextResponse.redirect(new URL("/login", request.url))
    } else if (publicApiPaths.includes(pathname)) {
        if(request.method=="POST"){
            if (!authCoockies) return NextResponse.redirect(new URL("/login", request.url))
            const authResponse = await fetch(`${origin}/api/auth/user/verify`, {
                headers: {
                    "Cookie": `auth_token=${authCoockies}`
                }
            })
    
            if (!authResponse.ok) return NextResponse.redirect(new URL("/login", request.url))
    
            const { user } = await authResponse.json()
            if (!user) return NextResponse.redirect(new URL("/login", request.url))
    
            const headers = new Headers(request.headers)
            headers.set("x-user", JSON.stringify(user))
            return NextResponse.next({ headers })
        }else{
            return NextResponse.next()
        }
    } else if(publicGetApiPaths.includes(pathname)){
        if(request.method=="GET"){
            if (!authCoockies) return NextResponse.redirect(new URL("/login", request.url))
            const authResponse = await fetch(`${origin}/api/auth/user/verify`, {
                headers: {
                    "Cookie": `auth_token=${authCoockies}`
                }
            })
    
            if (!authResponse.ok) return NextResponse.redirect(new URL("/login", request.url))
    
            const { user } = await authResponse.json()
            if (!user) return NextResponse.redirect(new URL("/login", request.url))
    
            const headers = new Headers(request.headers)
            headers.set("x-user", JSON.stringify(user))
            return NextResponse.next({ headers })
        }else{
            return NextResponse.next()
        }
    } else {
        if (!authCoockies) return NextResponse.redirect(new URL("/login", request.url))
        const authResponse = await fetch(`${origin}/api/auth/user/verify`, {
            headers: {
                "Cookie": `auth_token=${authCoockies}`
            }
        })

        if (!authResponse.ok) return NextResponse.redirect(new URL("/login", request.url))

        const { user } = await authResponse.json()
        if (!user) return NextResponse.redirect(new URL("/login", request.url))

        const headers = new Headers(request.headers)
        headers.set("x-user", JSON.stringify(user))
        return NextResponse.next({ headers })
    }
}


export const config = {
    matcher: [
        "/",
        "/history",
        "/order",
        "/logout",

        "/login",
        "/signup",

        "/api/order_thap",
        "/api/thap"

    ],
}