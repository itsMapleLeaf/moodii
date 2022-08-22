import { PrismaClient } from "@prisma/client"

declare global {
  var prismaClient: PrismaClient | undefined
}

const prisma = (globalThis.prismaClient ??= new PrismaClient())

export type User = {
  name: string
}

export async function upsertUser(
  twitterId: number,
  name: string,
): Promise<User> {
  return (
    (await prisma.user.findUnique({ where: { twitterId } })) ??
    (await prisma.user.create({ data: { twitterId, name } }))
  )
}
