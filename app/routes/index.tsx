import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { FiHeart, FiLogOut } from "react-icons/fi"
import useMeasure from "react-use-measure"
import { authenticator } from "~/auth.server"
import type { Mood } from "~/db.server"
import { getMoods } from "~/db.server"
import { last } from "~/helpers/last"
import { lerp, lerpInverse } from "~/helpers/lerp"
import { outlineButtonClass } from "~/styles"

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }

  const moods = await getMoods(user.id)
  return json({ user, moods, now: Date.now() })
}

export default function Index() {
  const { user, moods, now } = useLoaderData<typeof loader>()

  return (
    <main className="flex flex-col items-center gap-8 text-center">
      <p className="text-2xl font-light">
        hi, {user.name}!<br />
        here's how you've felt over time.
      </p>
      <MoodOverTime moods={moods} now={now} />
      <div className="flex flex-col items-center gap-3">
        <Link to="/mood" className={outlineButtonClass}>
          <FiHeart /> add a mood
        </Link>
        <Form action="/logout" method="post">
          <button type="submit" className={outlineButtonClass}>
            <FiLogOut /> sign out
          </button>
        </Form>
      </div>
    </main>
  )
}

function MoodOverTime({ moods, now }: { moods: Mood[]; now: number }) {
  const oneSecond = 1000
  const oneMinute = oneSecond * 60
  const oneHour = oneMinute * 60

  const rangeOptions = [
    { label: "1y", value: oneHour * 24 * 365 },
    { label: "1m", value: oneHour * 24 * 30 },
    { label: "1w", value: oneHour * 24 * 7 },
    { label: "1d", value: oneHour * 24 },
    { label: "1h", value: oneHour },
  ] as const

  const [rangeOptionIndex, setRangeOptionIndex] = useState(-1)
  const rangeOption = rangeOptions[rangeOptionIndex] ?? rangeOptions[3]

  useEffect(() => {
    const storedValue = Number(localStorage.getItem("rangeOptionIndex"))
    if (Number.isInteger(storedValue)) setRangeOptionIndex(storedValue)
  }, [])

  useEffect(() => {
    localStorage.setItem("rangeOptionIndex", String(rangeOptionIndex))
  })

  const lowestMood = Math.min(...moods.map((m) => m.value))
  const highestMood = Math.max(...moods.map((m) => m.value))

  const points = moods.map((mood) => {
    const x = 1 - (now - new Date(mood.createdAt).valueOf()) / rangeOption.value
    const y = lerp(0.1, 0.9, lerpInverse(highestMood, lowestMood, mood.value))
    return { x, y }
  })

  return (
    <section className="border border-current/50 rounded-lg overflow-clip divide-y">
      <div className="w-full h-40">
        <LineGraph points={points} />
      </div>
      <div className="grid grid-flow-col auto-cols-fr divide-x">
        {rangeOptions.map((option, index) => (
          <label key={option.label} className="relative">
            <input
              type="radio"
              name="range"
              value={option.value}
              checked={index === rangeOptionIndex}
              onChange={() => setRangeOptionIndex(index)}
              className="appearance-none block absolute inset-0 [&:not(:checked)]:hover:bg-blue-500/25 checked:bg-blue-500/50 cursor-pointer transition"
            />
            <span className="relative p-3 text-xs leading-none pointer-events-none">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  )
}

type Point = {
  x: number
  y: number
}

function LineGraph({ points: pointsProp }: { points: Point[] }) {
  const [ref, rect] = useMeasure()

  const sortedPoints = [...pointsProp].sort((a, b) => a.x - b.x)

  const points = [
    { x: 0, y: sortedPoints[0]?.y ?? 0.5 },
    ...sortedPoints,
    { x: 1, y: last(sortedPoints)?.y ?? 0.5 },
  ].map(({ x, y }) => ({
    x: x * rect.width,
    y: y * rect.height,
  })) as [Point, ...Point[], Point]

  const firstPoint = points[0]
  const lastPoint = last(points)

  return (
    // if the ref goes on the svg element, it doesn't get measured immediately (????)
    <div className="w-full h-full" ref={ref}>
      <svg className="w-full h-full">
        <polygon
          points={[
            `${firstPoint.x}, ${rect.height}`,
            ...points.map((p) => `${p.x},${p.y}`),
            `${lastPoint.x}, ${rect.height}`,
          ].join(" ")}
          fill="currentColor"
          opacity="0.1"
        />
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={1}
        />
      </svg>
    </div>
  )
}
