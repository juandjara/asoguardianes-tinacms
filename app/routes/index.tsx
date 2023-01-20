import { client } from '_tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Post from '@/components/Post'

export async function loader({ params, request }: LoaderArgs) {
  const cmsProps = await client.queries.pages({ relativePath: 'index.md' })
  return { cmsProps }
}

export default function Index() {
  const { cmsProps } = useLoaderData<typeof loader>()
  const { data } = useTina(cmsProps)
  const item = data.pages

  return <Post item={{ ...item, title: '' }} />
}
