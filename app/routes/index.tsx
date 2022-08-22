import { Form, useLoaderData } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import clsx from "clsx"
import { FiHeart, FiTwitter } from "react-icons/fi"
import { authenticator, sessionStorage } from "~/auth.server"

export async function loader({ request }: LoaderArgs) {
  console.log(request.headers)
  console.log(
    (await sessionStorage.getSession(request.headers.get("cookie"))).data,
  )
  const user = await authenticator.isAuthenticated(request)
  console.log(user)
  return json({ user })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()

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
            <button className={outlineButtonClass}>
              <FiTwitter />
              log in with twitter
            </button>
          </Form>
        </div>
      </main>
    )
  }

  return <p>hi, {user.name}!</p>
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
