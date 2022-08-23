import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { FiLogOut } from "react-icons/fi"
import { authenticator } from "~/auth.server"
import { outlineButtonClass } from "~/styles"

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }
  return json({ user })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <main className="flex flex-col items-center gap-4">
      <p>hi, {user.name}!</p>
      <Form method="post" action="/auth/logout" className="contents">
        <button type="submit" className={outlineButtonClass}>
          <FiLogOut />
          sign out
        </button>
      </Form>
    </main>
  )
}
