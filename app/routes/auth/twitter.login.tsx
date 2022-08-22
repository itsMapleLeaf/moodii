import type { ActionArgs } from "@remix-run/server-runtime"
import { authenticator } from "~/auth"

export async function action({ request }: ActionArgs) {
  return authenticator.authenticate("twitter", request, { throwOnError: false })
}
