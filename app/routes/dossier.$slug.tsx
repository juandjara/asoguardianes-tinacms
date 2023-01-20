import { client } from '_tina/__generated__/client'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useTina } from 'tinacms/dist/react'
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { extractHeadingsFromContent } from '@/lib/mdHeadingUtils'
import Post from '@/components/Post'

export async function loader({ params, request }: LoaderArgs) {
  const slug = params['slug']
  if (!slug) {
    throw new Error('"slug" param must be defined when accesing dossier page')
  }

  try {
    const cmsProps = await client.queries.dossier({ relativePath: `${slug}.md` })
    const content = cmsProps.data.dossier.body as TinaMarkdownContent
    const headings = await extractHeadingsFromContent(content)
  
    return { headings, cmsProps }
  } catch (err) {
    console.error(err)
    if ((err as Error).message.includes('Unable to find record')) {
      throw new Response('Not found', { status: 404, statusText: 'Not Found' })
    } else {
      throw new Response('error', { status: 500, statusText: 'Internal error' })
    }
  }
}

export default function DossierPage() {
  const { headings, cmsProps } = useLoaderData<typeof loader>()
  const { data } = useTina(cmsProps)
  const item = data.dossier

  return (
    <Post headings={headings} item={item} />
  )
}
