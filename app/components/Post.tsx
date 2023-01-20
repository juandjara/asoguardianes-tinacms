import type { Headings} from "@/lib/mdHeadingUtils"
import { markdownHeadingComponents } from "@/lib/mdHeadingUtils"
import TableOfContents from "./TableOfContents"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import type { Dossier } from "_tina/__generated__/types"

export default function Post({ headings, item }: { headings?: Headings; item: Omit<Dossier, '__typename' | '_values' | '_sys'> }) {
  const hasHeadings = !!headings?.length
  const cropCN = item.nocrop ? '' : 'aspect-video overflow-hidden'

  return (
    <div className='mx-auto my-6 prose md:prose-xl prose-stone prose-red prose-headings:text-red-900'>
      {item.title ? (
        <h2 className='font-medium tracking-wide text-red-900 text-center'>{item.title}</h2>
      ) : null}
      {item.image ? (
        <figure className={`relative border border-gray-200 rounded-md ${cropCN}`}>
          <img className={`mx-auto ${item.image_caption ? 'rounded-t-md' : 'rounded-md'}`} src={item.image} alt={item.image_caption || ''} />
          {item.image_caption && (
            <figcaption className='text-white absolute right-3 bottom-2'>
              {item.image_caption}
            </figcaption>
          )}
        </figure>
      ) : null}
      {hasHeadings ? (
        <TableOfContents headings={headings} />
      ) : null}
      <TinaMarkdown
        components={hasHeadings ? markdownHeadingComponents(headings) : {}}
        content={item.body}
      />
    </div>
  )
}
