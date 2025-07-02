import { orderValidation } from "@/app/validation_zod/OrderValidation";
import { OrderformDataType } from "@/app/valuedefiner/OrderValueDefiner";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { ZodError } from "zod/v4";
// import checkAuth from "@/lib/checkAuth";
import { PrismaClientKnownRequestError } from "../../../../generated/prisma/runtime/library";

export async function POST(request: NextRequest) {

    const x_user = JSON.parse(request.headers.get("x-user") as string) as {
        id:string,
        email:string,
        name:string,
        role:string
    }


    if(!x_user) return NextResponse.json({message:"user is unauthorized"},{status:401})
    if(!x_user.id) return NextResponse.json({message:"user is unauthorized"},{status:401})
    try{
        const jsonData = await request.json() as OrderformDataType
        const data = orderValidation.parse(jsonData)
        console.log(data.image)
        let picture;
        if (data.image) {
            picture = await cloudinary.uploader.upload(data.image, {
                format: "webp",
            })
        }
    
        if (picture?.secure_url) {
            data.image = picture?.secure_url
        }
        const thapis = await prisma.thap.create({
            data:{
                name:data.name,
                link:data.link,
                dob:data.dob,
                address:data.address,
                gender:data.gender,
                image:data.image,
                user_id:x_user.id,
            }
        })

        if(thapis){
            return NextResponse.json({message:"ঠাপ পাঠানো হয়েছে"},{status:201})
        }else{
            return NextResponse.json({message:"something went wrong"},{status:403})
        }
    }catch(error){
        if(error instanceof Error){
            if(error instanceof ZodError){
                return NextResponse.json({message:error.issues},{status:400})
            }else if(error instanceof PrismaClientKnownRequestError){
                return NextResponse.json({message:error.message},{status:401})
            }
            return NextResponse.json({message:error.message},{status:500})
        }
    }

}

export async function GET(requset:NextRequest) {
    console.log(requset.cookies.get("auth_token")?.value)
    return NextResponse.json(requset)
}