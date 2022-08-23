import type { ActionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { authenticator } from "~/auth.server"

export async function loader() {
  return redirect("/")
}

export async function action({ request, params }: ActionArgs) {
  return authenticator.authenticate(params.strategy!, request, {
    throwOnError: false,
  })
}
