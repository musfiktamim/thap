import prisma from "@/lib/prismaClient";
import { decrypt } from "@/lib/sessions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const authCookie = request.cookies.get("auth_token")?.value
    try {
        const payload = await decrypt(authCookie)
        if (!payload?.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        const user = await prisma.user.findFirst({
            where: {
                id: payload?.userId
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })


        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ user })

    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
    }
}