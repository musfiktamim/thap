import {PrismaClient} from "../../generated/prisma/client"

const prisma = new PrismaClient({
    log:["error"]
})

export default prisma