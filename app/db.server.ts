import { PrismaClient } from "@prisma/client"

declare global {
  var prismaClient: PrismaClient | undefined
}

const prisma = (globalThis.prismaClient ??= new PrismaClient())

export type User = {
  id: string
  name: string
}

export async function upsertUser(
  twitterId: number,
  name: string,
): Promise<User> {
  return (
    (await prisma.user.findUnique({
      where: { twitterId },
      select: { id: true, name: true },
    })) ??
    (await prisma.user.create({
      data: { twitterId, name },
      select: { id: true, name: true },
    }))
  )
}

export type Mood = {
  id: string
  value: number
}

export async function createMood(userId: string, value: number): Promise<Mood> {
  return prisma.mood.create({
    data: { userId, value },
    select: { id: true, value: true },
  })
}

export async function getMoods(userId: string): Promise<Mood[]> {
  return prisma.mood.findMany({
    where: { userId },
    select: { id: true, value: true },
  })
}

export async function getLatestMood(userId: string): Promise<Mood | undefined> {
  const mood = await prisma.mood.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, value: true },
  })
  return mood ?? undefined
}
