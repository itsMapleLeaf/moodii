import clsx from "clsx"
import { FiHeart, FiMail, FiTwitter } from "react-icons/fi"

export default function Index() {
  return (
    <main className="flex flex-col items-center max-w-sm text-center gap-8">
      <h1 className="font-light text-4xl leading-none">
        hi, welcome to moodii!
      </h1>
      <p>
        we don't always feel our best. moodii is a simple app to help you track
        how you're feeling over time. <FiHeart className="inline-block" />
      </p>
      <div className="flex flex-col items-center gap-4">
        <button className={buttonClass}>
          <FiTwitter />
          log in with twitter
        </button>
        <button className={buttonClass}>
          <FiMail />
          log in with magic link
        </button>
      </div>
    </main>
  )
}

const buttonClass = clsx`
  border border-white rounded-lg p-4 leading-none transition flex items-center justify-center gap-2
  hover:-translate-y-0.5 hover:shadow-sm
  active:translate-y-0 active:opacity-75
`
