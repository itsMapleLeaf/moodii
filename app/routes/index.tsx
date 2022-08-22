import { Form, useLoaderData, useTransition } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import clsx from "clsx"
import { FiHeart, FiLogOut, FiTwitter } from "react-icons/fi"
import { authenticator } from "~/auth.server"

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request)
  return json({ user })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  const transition = useTransition()

  if (!user) {
    return (
      <main className="flex flex-col items-center max-w-sm text-center gap-8">
        <h1 className="font-light text-4xl leading-none">
          hi, welcome to moodii!
        </h1>
        <p>
          we don't always feel our best. moodii is a simple app to help you
          track how you're feeling over time.{" "}
          <FiHeart className="inline-block" />
        </p>
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <Form method="post" action="/auth/twitter/login" className="contents">
            <button type="submit" className={outlineButtonClass}>
              <FiTwitter />
              log in with twitter
            </button>
            {transition.submission?.action === "/auth/twitter/login" && (
              <p>
                <span className="inline-block mr-2">just a moment...</span>
                <span className="inline-grid grid-cols-2 w-4 h-4 gap-0.5 animate-spin align-middle">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="rounded-full bg-white" />
                  ))}
                </span>
              </p>
            )}
          </Form>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center gap-4">
      <p>hi, {user.name}!</p>
      <Form method="post" action="/auth/logout" className="contents">
        <button type="submit" className={outlineButtonClass}>
          <FiLogOut />
          log out
        </button>
      </Form>
    </main>
  )
}

const controlBorderClass = clsx("border border-white rounded-lg")

const clearButtonClass = clsx(
  "p-4 leading-none transition flex items-center justify-center gap-2 bg-transparent hover:bg-white/10",
)

const outlineButtonClass = clsx(
  controlBorderClass,
  clearButtonClass,
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-75",
)
