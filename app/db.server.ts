import { PrismaClient } from "@prisma/client"
import { isTruthy } from "./helpers/is-truthy"
import { omit } from "./helpers/omit"

declare global {
  var prismaClient: PrismaClient | undefined
}

const prisma = (globalThis.prismaClient ??= new PrismaClient())

export type User = {
  id: string
  name: string
}

export async function upsertUser(data: {
  name: string
  email?: string
  twitterId?: number
  discordId?: string
}): Promise<User> {
  const conditions = [
    data.email && { email: data.email },
    data.twitterId && { twitterId: data.twitterId },
    data.discordId && { discordId: data.discordId },
  ].filter(isTruthy)

  const select = {
    id: true,
    name: true,
  }

  const existing = await prisma.user.findFirst({
    where: { OR: conditions },
    select,
  })

  return existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: omit(data, ["name"]),
        select,
      })
    : await prisma.user.create({
        data,
        select,
      })
}

export type Mood = {
  id: string
  value: number
  createdAt: string
}

const serializeMood = (m: {
  id: string
  value: number
  createdAt: Date
}): { createdAt: string; id: string; value: number } => ({
  ...m,
  createdAt: m.createdAt.toISOString(),
})

export async function createMood(userId: string, value: number): Promise<void> {
  await prisma.mood.create({
    data: { userId, value },
    select: { id: true, value: true },
  })
}

export async function getMoods(userId: string): Promise<Mood[]> {
  const moods = await prisma.mood.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, value: true, createdAt: true },
  })

  return moods.map(serializeMood)
}

export async function getLatestMood(userId: string): Promise<Mood | undefined> {
  const mood = await prisma.mood.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, value: true, createdAt: true },
  })
  return mood ? serializeMood(mood) : undefined
}
