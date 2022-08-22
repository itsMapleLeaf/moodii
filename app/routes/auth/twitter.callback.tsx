import type { LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { authenticator } from "~/auth"

export async function loader({ request }: LoaderArgs) {
  await authenticator.authenticate("twitter", request)
  return redirect("/")
}
