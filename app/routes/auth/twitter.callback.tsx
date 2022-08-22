import type { LoaderArgs } from "@remix-run/node"
import { authenticator } from "~/auth.server"

export async function loader({ request }: LoaderArgs) {
  return authenticator.authenticate("twitter", request, {
    successRedirect: "/",
  })
}
