import type { LoaderArgs, MetaFunction } from "@remix-run/node"
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react"
import GlobalSpinner from "./components/GlobalSpiner"
import LiveReload from "./components/LiveReload"
import tailwind from "./tailwind.css"
import { client } from '_tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { buttonCN } from "./styles"

export function links() {
  return [
    { rel: "stylesheet", href: tailwind },
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: 'Remix Tailwind Starter',
  viewport: "width=device-width,initial-scale=1",
})

export async function loader({ params, request }: LoaderArgs) {
  const configQuery = await client.queries.config({ relativePath: 'config.json' })
  return configQuery
}

export type SiteConfigQuery = Awaited<ReturnType<typeof loader>>
export type SiteConfigData = SiteConfigQuery['data']['config']

const bodyCN = [
  'px-2 min-h-screen text-white',
  'bg-gradient-to-b from-red-500 via-rose-700 to-rose-800 '
].join(' ')

export default function App() {
  const query = useLoaderData<typeof loader>()
  const siteConfig = query.data.config

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={bodyCN}>
        <GlobalSpinner />
        <Nav siteConfig={siteConfig} />
        <div className="max-w-4xl mx-auto bg-white p-3 mb-8 rounded-md">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh noes! 💥</title>
        <Meta />
        <Links />
      </head>
      <body className={bodyCN}>
        <div className="max-w-xl bg-red-50 text-red-800 rounded-xl my-8 mx-auto p-4">
          <h1 className="text-2xl font-bold text-red-600">
            Boom! 
            <span role='img' aria-label='explosion'>💥</span>
          </h1>
          <h2 className="mt-1 text-xl font-bold text-red-600">There was an unexpected error</h2>
          <p className="my-2 text-lg">{error.message}</p>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const { status, statusText, data } = useCatch()
  const title = `${status} ${statusText}`

  return (
    <html>
      <head>
        <title>{'Oops! 😟 ' + title}</title>
        <Meta />
        <Links />
      </head>
      <style>{`body { color-scheme: dark; }`}</style>
      <body className={bodyCN}>
        <div className="h-screen flex flex-col items-center justify-center text-center">
          <div>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-base">{data?.message}</p>
          </div>
          <p className="text-2xl mt-4 mb-8">
            <span role='img' aria-label='Worried face'>😟 </span>
            {status === 404 ? 'No hay nada en esta URL' : `Algo no ha funcionado como se esperaba`}
          </p>
          <Link to="/" className={`${buttonCN.shadow} ${buttonCN.normal} ${buttonCN.primary}`}>Volver</Link>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
