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
  const { id } = await e
    .insert(e.User, { name, twitter_id: twitterId })
    .unlessConflict((user) => ({
      on: user.twitter_id,
      else: e.update(user, () => ({
        set: { name },
      })),
    }))
    .run(client)

  const user = await e
    .select(e.User, (user) => ({
      filter: e.op(user.id, "=", e.uuid(id)),
      name: true,
    }))
    .run(client)

  return user!
}
