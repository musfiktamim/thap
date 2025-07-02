import { z } from "zod";

export const SignUpValidation = z.object({
    name:z.string().min(3).max(100),
    email:z.string().email({message:"email must be email"}),
    phone:z.string().max(20),
    password:z.string()
})

export const SignInValidation = z.object({
    email:z.string().email(),
    password:z.string()
})