import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import tailwindCss from "./tailwind.css"

export const meta: MetaFunction = () => ({
  "charset": "utf-8",
  "title": "moodii",
  "description": "track how well you're feeling over time 💜",
  "viewport": "width=device-width,initial-scale=1",
  "theme-color": "#86198f",
})

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.png" },
  { rel: "stylesheet", href: tailwindCss },
  { rel: "stylesheet", href: "/fonts/fonts.css" },
]

export default function App() {
  return (
    <html
      lang="en"
      className="bg-gradient-to-b from-fuchsia-800 to-indigo-800 min-h-screen text-fuchsia-100 font-sans overflow-x-hidden"
      style={{ wordBreak: "break-word" }}
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col pt-8 px-8 pb-4 gap-4">
        <div className="m-auto">
          <Outlet />
        </div>
        <footer className="p-2 text-center opacity-50 text-xs">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://mapleleaf.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b hover:border-b-0"
          >
            itsMapleLeaf
          </a>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
