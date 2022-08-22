import { createCookieSessionStorage } from "@remix-run/node"
import { Authenticator } from "remix-auth"
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
    },
    ({ profile }) => upsertUser(profile.id, profile.name),
  ),
  "twitter",
)
