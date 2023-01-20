import type { SiteConfigData } from "@/root"
import { buttonCN } from "@/styles"
import { Link } from "@remix-run/react"

const linkCN = `block whitespace-nowrap ${buttonCN.shadow} ${buttonCN.normal} ${buttonCN.primary}`

export default function Nav({ siteConfig }: { siteConfig: SiteConfigData }) {
  return (
    <div className="max-w-prose mx-auto space-y-8 py-8">
      <Link to='/' className='block'>
        <img className="w-28 mx-auto" src="/images/escudo-flat-blanco.png" alt="Escudo guardianes" />
      </Link>
      <div className="text-center">
        <h1 className="text-2xl md:font-light md:text-4xl tracking-wider mb-1">{siteConfig?.title}</h1>
        <p className="text-base md:text-xl tracking-wide text-red-50">{siteConfig?.description}</p>
      </div>
      <nav className="flex items-center md:justify-center gap-3 overflow-x-auto">
        {siteConfig.topnav.filter(item => !item.hidden).map(item => (
          item.external
            ? <a key={item.link} className={linkCN} href={item.link}>{item.title}</a>
            : <Link key={item.link} className={linkCN} to={item.link}>{item.title}</Link>
        ))}
      </nav>
    </div>
  )
}
