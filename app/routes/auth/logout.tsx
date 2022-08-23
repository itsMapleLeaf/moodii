import type { ActionArgs } from "@remix-run/server-runtime"
import { authenticator } from "~/auth.server"

export function action({ request }: ActionArgs) {
  return authenticator.logout(request, { redirectTo: "/login" })
}
