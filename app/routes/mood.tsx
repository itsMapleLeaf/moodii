import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { Fragment } from "react"
import { authenticator } from "~/auth.server"
import { range } from "~/helpers/range"
import { outlineButtonClass } from "~/styles"

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }
  return json({ user })
}

export default function MoodPage() {
  return (
    <main className="flex flex-col items-center gap-8 text-center">
      <h1 className="text-3xl font-light">how are you feeling?</h1>
      <Form method="post" className="contents">
        <div className="flex flex-col-reverse items-center gap-6 sm:flex-row">
          <p>way worse 😔</p>
          <div className="flex flex-col-reverse items-center sm:flex-row">
            {range(-3, 4).map((n) => (
              <Fragment key={n}>
                <input
                  type="radio"
                  name="mood"
                  value={n}
                  className="appearance-none border border-current rounded-full cursor-pointer checked:bg-blue-500/50 hover:bg-white/25 checked:hover:bg-blue-500/25"
                  style={{
                    width: `${1.25 + Math.abs(n) * 0.25}rem`,
                    height: `${1.25 + Math.abs(n) * 0.25}rem`,
                  }}
                />
                {n < 3 && (
                  <div className="h-3 border-r border-current sm:hidden" />
                )}
                {n < 3 && (
                  <div className="w-3 border-b border-current hidden sm:block" />
                )}
              </Fragment>
            ))}
          </div>
          <p>way better 😌</p>
        </div>
        <button type="submit" className={outlineButtonClass}>
          submit
        </button>
      </Form>
    </main>
  )
}
