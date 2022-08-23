import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useTransition } from "@remix-run/react"
import { FiHeart, FiTwitter } from "react-icons/fi"
import { authenticator } from "~/auth.server"
import { outlineButtonClass } from "~/styles"
import { Spinner } from "~/ui/spinner"

export async function loader({ request }: LoaderArgs) {
  if (await authenticator.isAuthenticated(request)) {
    return redirect("/")
  }
  return json({})
}

export default function Welcome() {
  const transition = useTransition()
  return (
    <main className="flex flex-col items-center max-w-sm text-center gap-8">
      <h1 className="font-light text-4xl leading-none">
        hi, welcome to moodii!
      </h1>
      <p>
        we don't always feel our best. moodii is a simple app to help you track
        how you're feeling over time. <FiHeart className="inline-block" />
      </p>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <Form method="post" action="/auth/twitter/login" className="contents">
          <button type="submit" className={outlineButtonClass}>
            <FiTwitter />
            sign in with twitter
          </button>
          {transition.submission?.action === "/auth/twitter/login" && (
            <p>
              <span className="inline-block mr-2">just a moment...</span>
              <Spinner />
            </p>
          )}
        </Form>
      </div>
    </main>
  )
}
