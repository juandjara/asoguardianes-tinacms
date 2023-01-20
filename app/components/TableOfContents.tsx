import type { Headings } from "@/lib/mdHeadingUtils"

export default function TableOfContents({ headings }: { headings: Headings }) {
  const minHeading = Math.min(...headings.map(h => h.level))
  const sizeMap = ['text-xl', 'text-base', 'text-base', 'text-sm']
  const mtMap = ['mt-6', 'mt-4', 'mt-3', 'mt-2']
  const colorMap = ['text-gray-700', 'text-gray-600', 'text-gray-600', 'text-gray-500']

  function getHeadingStyle(level: number) {
    const n = level - minHeading
    const size = sizeMap[n]
    const mt = mtMap[n]
    const posibleCNs = 'ml-4 ml-8 ml-12 ml-16'
    const ml = n === -1 ? posibleCNs : `ml-${n * 4}`
    const color = colorMap[n]
    return [size, mt, ml, color].join(' ')
  }

  return (
    <details className='not-prose border border-stone-300 rounded-md'>
      <summary className="p-3 cursor-pointer">Tabla de contenidos</summary>
      <ul className="pb-8 px-6 -mt-2">
        {headings.map((h, i) => (
          <li key={`h${h.level}_${i}`} className={getHeadingStyle(h.level)}>
            <a className='text-red-900 hover:underline' href={`#${h.slug}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </details>
  )
}
