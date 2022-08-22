import { literal, object, string, union } from "zod"

const envSchema = object({
  NODE_ENV: union([
    literal("development"),
    literal("production"),
    literal("test"),
  ]).optional(),
  DATABASE_URL: string(),
  TWITTER_CLIENT_ID: string(),
  TWITTER_CLIENT_SECRET: string(),
  TWITTER_CALLBACK_URL: string(),
}).passthrough()

export const env = envSchema.parse(process.env)
