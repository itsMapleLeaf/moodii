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
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindCss },
  { rel: "stylesheet", href: "/fonts/fonts.css" },
]

export default function App() {
  return (
    <html
      lang="en"
      className="bg-gradient-to-b from-fuchsia-800 to-indigo-800 h-full text-fuchsia-100 font-sans"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full flex flex-col">
        <div className="m-auto p-4">
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
