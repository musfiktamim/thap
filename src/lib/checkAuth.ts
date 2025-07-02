import prisma from "./prismaClient"
import { decrypt } from "./sessions"

export default async function checkAuth(cookie:string) {
    if(!cookie) return {mission:false,message:"token not found"}
    try{
        const {userId} = await decrypt(cookie)
        if(!userId) return {mission:false,messahe:"Token not valid"}
        const findUser = await prisma.user.findFirst({where:{id:userId}})
        if(!findUser) return {mission:false,message:"Token is not valid"}
        return {mission:true,user:findUser}
    }catch(error){
        if(error instanceof Error) return {mission:false,message:error.message}
    }
}