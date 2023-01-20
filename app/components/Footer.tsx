import useSiteConfigQuery from "@/lib/useSiteConfigQuery"
import { Link } from "@remix-run/react"

export default function Footer() {
  const query = useSiteConfigQuery()
  const socials = query.data.config.socials

  function getAlt(title: string, link: string) {
    const u = new URL(link)
    return u.hostname ? `${title} en ${u.hostname}` : title
  }

  return (
    <footer className="mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        {socials.filter(s => !s.hidden).map((s) => (
          <a className="border border-transparent hover:border-red-300 hover:shadow-md hover:shadow-red-300 p-1 rounded-md" key={s.link} href={s.link} title={s.title}>
            <img className="w-7" src={s.icon} alt={getAlt(s.title, s.link)} />
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link to='' className="hover:underline">Privacidad y RGPD</Link>
        {' | '}
        <a href="https://github.com/juandjara/asoguardianes.com" className="hover:underline">Codigo fuente en Github</a>
        {' | '}
        <a href="/admin">Editar</a>
      </div>
    </footer>
  )  
}
