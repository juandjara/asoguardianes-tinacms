import useSiteConfigQuery from "@/lib/useSiteConfigQuery"
import { Link } from "@remix-run/react"
import { useTina } from "tinacms/dist/react"

export default function Dossier() {
  const query = useSiteConfigQuery()
  const { data } = useTina(query)
  
  return (
    <div>
      <ul className="my-6 grid place-items-center grid-cols-2 md:grid-cols-3 gap-4">
        {data.config.dossier.filter(d => !d.hidden).map((d) => (
          <li key={d.link} className={`border-2 border-transparent hover:border-red-200 hover:shadow-md hover:shadow-red-200 transition-shadow w-40 rounded-md p-2`}>
            <Link to={d.link} className="flex flex-col items-center justify-start gap-3">
              <img className="w-24 border-4 border-red-200 rounded-full bg-red-500" src={d.icon} alt="" />
              <p className="text-center text-red-900 text-xl font-medium uppercase tracking-wide">{d.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
