import e from "dbschema/edgeql-js"
import createClient from "edgedb"

const client = createClient()

export type User = {
  name: string
}

export async function upsertUser(
  twitterId: number,
  name: string,
): Promise<User> {
  const upsertQuery = e
    .insert(e.User, { name, twitter_id: twitterId })
    .unlessConflict((user) => ({
      on: user.twitter_id,
      else: e.select(user, () => ({ id: true })),
    }))

  return e.select(upsertQuery, () => ({ name: true })).run(client)
}
