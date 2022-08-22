import { createCookieSessionStorage } from "@remix-run/node"
import { Authenticator } from "remix-auth"

import { TwitterStrategy } from "remix-auth-twitter"

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
})

export const authenticator = new Authenticator(sessionStorage)

authenticator.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
      // In order to get user's email address, you need to configure your app permission.
      // See https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials.
      // includeEmail: false, // Optional parameter. Default: false.
    },
    // Define what to do when the user is authenticated
    async ({ accessToken, accessTokenSecret, profile }) => {
      console.log(profile)
      // profile contains all the info from `account/verify_credentials`
      // https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials
      // Return a user object to store in sessionStorage.
      // You can also throw Error to reject the login
      // return await registerUser(
      //   accessToken,
      //   accessTokenSecret,
      //   profile
      // );
    },
  ),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "twitter",
)
