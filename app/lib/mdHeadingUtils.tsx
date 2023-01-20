import type { TinaMarkdownContent } from 'tinacms/dist/rich-text'

export async function extractHeadingsFromContent(content: TinaMarkdownContent) {
  const slugify = (await import('@sindresorhus/slugify')).default
  const headings = content.children
    .filter(c => ['h2', 'h3', 'h4', 'h5'].includes(c.type))
    .map(h => {
      const firstChild = h.children[0] as any
      return {
        slug: slugify(firstChild.text),
        level: Number(h.type.replace('h', '')),
        text: firstChild.text
      }
    })
  
  return headings
}

export type Headings = Awaited<ReturnType<typeof extractHeadingsFromContent>>

export function markdownHeadingComponents(headings: Headings) {
  return {
    h2: (props: any) => <Heading id={extractSlug(props?.children, headings)} as='h2' children={props?.children} />,
    h3: (props: any) => <Heading id={extractSlug(props?.children, headings)} as='h3' children={props?.children} />,
    h4: (props: any) => <Heading id={extractSlug(props?.children, headings)} as='h4' children={props?.children} />,
    h5: (props: any) => <Heading id={extractSlug(props?.children, headings)} as='h5' children={props?.children} />,
  }
}

function extractSlug(jsx?: JSX.Element, headings?: Headings) {
  const text = jsx?.props?.content?.[0]?.text
  const heading = headings?.find(h => h.text === text)
  return heading?.slug || ''
}

function Heading({ id, children, as: H }: { id: string; children?: JSX.Element; as: 'h2' | 'h3' | 'h4' | 'h5' }) {
  return <H id={id}>{children}</H>
}
