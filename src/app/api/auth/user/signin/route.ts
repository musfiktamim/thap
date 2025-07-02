import { SignInValidation} from "@/app/validation_zod/SignUpValidation";
import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";
import {createSession} from "@/lib/sessions"
import { SignInDataType } from "@/app/valuedefiner/UserSignupDefiner";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "../../../../../../generated/prisma/runtime/library";

export async function POST(requset:NextRequest){
    try{
        const jsonData = await requset.json() as SignInDataType
        const data = SignInValidation.parse(jsonData);
        
        const findUser =await prisma.user.findFirst({
            where:{
                email:data.email
            }
        })
        
        if(findUser){
            const isPassWordTrue =await bcrypt.compare(data.password,findUser.password)
            if(!isPassWordTrue) return NextResponse.json({message:"Invalid user"},{status:404})
                
            findUser.password = ""
            await createSession(findUser.id)
            return NextResponse.json({message:"loged in",user:findUser},{status:200})
        }else{
            return NextResponse.json({message:"User Not Found"},{status:404})
        }
    }catch(error){
        if(error instanceof Error){
            if(error instanceof ZodError){
                return NextResponse.json({message:error.issues},{status:400})
            }else if(error instanceof PrismaClientKnownRequestError){
                return NextResponse.json({message:error.message},{status:400})
            }
            return NextResponse.json({message:error.message},{status:500})
        }
    }

    
}