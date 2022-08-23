import type { LoaderArgs } from "@remix-run/node"
import { authenticator } from "~/auth.server"

export async function loader({ request, params }: LoaderArgs) {
  return authenticator.authenticate(params.strategy!, request, {
    successRedirect: "/",
  })
}
