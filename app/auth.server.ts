import { createCookieSessionStorage } from "@remix-run/node"
import { Authenticator } from "remix-auth"
import { DiscordStrategy } from "remix-auth-socials"
import { TwitterStrategy } from "remix-auth-twitter"
import type { User } from "./db.server"
import { upsertUser } from "./db.server"
import { env } from "./env"

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "moodii_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"],
    secure: env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  },
})

export const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(
  new TwitterStrategy(
    {
      clientID: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
      callbackURL: env.TWITTER_CALLBACK_URL,
      includeEmail: true,
    },
    ({ profile }) => {
      return upsertUser({
        name: profile.name,
        email: profile.email,
        twitterId: profile.id,
      })
    },
  ),
  "twitter",
)

authenticator.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      callbackURL: env.DISCORD_CALLBACK_URL,
    },
    ({ profile }) => {
      return upsertUser({
        name: profile.displayName,
        email: profile.emails?.at(0)?.value,
        discordId: profile.id,
      })
    },
  ),
  "discord",
)
