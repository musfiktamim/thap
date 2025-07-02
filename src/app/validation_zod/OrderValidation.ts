import * as z from "zod"

export const orderValidation = z.object({
    name:z.string(),
    link:z.string().url({message:"link must be url"}),
    dob:z.string(),
    address:z.string().nullable(),
    gender:z.enum(["man","woman"],{message:"you only enter man or woman"}).nullable(),
    image:z.string().nullable()
})