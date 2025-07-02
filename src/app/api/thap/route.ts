import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function GET(req: Request) {
    const x_user = JSON.parse(req.headers.get("x-user") as string) as {
        id:string,
        email:string,
        name:string,
        role:string
    }
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '0')
  const limit = 10

  const data = await prisma.thap.findMany({
    skip: page * limit,
    take: limit,
    where:{
        user_id:x_user.id
    },
    orderBy:[
        {createdAt:'desc'},
    ],
    include: { user: true },
  })

  const totalCount = await prisma.thap.count()

  return NextResponse.json({
    items: data,
    hasMore: (page + 1) * limit < totalCount,
  })
}
