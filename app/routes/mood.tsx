import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useLocation, useTransition } from "@remix-run/react"
import { Fragment, useState } from "react"
import { object, string } from "zod"
import { authenticator } from "~/auth.server"
import { createMood, getLatestMood } from "~/db.server"
import { range } from "~/helpers/range"
import { outlineButtonClass } from "~/styles"
import { Spinner } from "~/ui/spinner"

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }
  return json({})
}

export async function action({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }

  const latestMood = await getLatestMood(user.id)

  const bodySchema = object({
    mood: string().transform((value) => {
      const number = Number(value)
      if (!Number.isInteger(number)) {
        throw new Error("not an integer")
      }
      return number
    }),
  })

  const body = bodySchema.parse(Object.fromEntries(await request.formData()))
  await createMood(user.id, (latestMood?.value ?? 0) + body.mood)
  return redirect("/")
}

export default function MoodPage() {
  const location = useLocation()
  const transition = useTransition()
  const [moodSet, setMoodSet] = useState(false)

  return (
    <main className="flex flex-col items-center gap-8 text-center">
      <h1 className="text-3xl font-light">how are you feeling?</h1>
      <Form method="post" className="contents">
        <div className="flex flex-col-reverse items-center gap-6 sm:flex-row">
          <p>way worse 😔</p>
          <div className="flex flex-col-reverse items-center sm:flex-row">
            {range(-3, 4).map((n) => (
              <Fragment key={n}>
                <label className="block">
                  <span className="sr-only">{n}</span>
                  <input
                    type="radio"
                    name="mood"
                    value={n}
                    onChange={() => setMoodSet(true)}
                    required
                    className="block appearance-none border border-current rounded-full cursor-pointer checked:bg-blue-500/50 hover:bg-white/25 checked:hover:bg-blue-500/25"
                    style={{
                      width: `${1.25 + Math.abs(n) * 0.25}rem`,
                      height: `${1.25 + Math.abs(n) * 0.25}rem`,
                    }}
                  />
                </label>
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
        {moodSet && (
          <button type="submit" className={outlineButtonClass}>
            submit{" "}
            {transition.submission?.action === location.pathname && <Spinner />}
          </button>
        )}
      </Form>
    </main>
  )
}
