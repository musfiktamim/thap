import { SignUpValidation } from "@/app/validation_zod/SignUpValidation";
import { SignUpDataType } from "@/app/valuedefiner/UserSignupDefiner";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";
import {createSession} from "@/lib/sessions"
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "../../../../../../generated/prisma/runtime/library";
export async function POST(requset:NextRequest){
    try{
        const jsonData = await requset.json() as SignUpDataType
        const data = SignUpValidation.parse(jsonData);

        const hashPassword = await bcrypt.hash(data.password,10)
        data.password = hashPassword

        const user = await prisma.user.create({
            data:data
        })
        if(user){
            await createSession(user.id)
            return NextResponse.json({message:"user created",user:user},{status:201})
        }else{
            return NextResponse.json({message:"something went wrong"},{status:500})
        }
    }catch(error){
        if(error instanceof Error){
            if(error instanceof ZodError){
                return NextResponse.json({message:error.issues},{status:400})
            }else if(error instanceof PrismaClientKnownRequestError){
                console.log(error)
                if(error.code=="P2002"){
                    return NextResponse.json({message:"phone and email must be unique"},{status:400})
                }
                return NextResponse.json({message:error.message},{status:400})
            }
            return NextResponse.json({message:error.message},{status:500})
        }
    }

    
}