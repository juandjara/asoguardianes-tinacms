import type { SiteConfigQuery } from "@/root"
import { useMatches } from "@remix-run/react"

export default function useSiteConfigQuery() {
  const m = useMatches()
  const query = m[0].data as SiteConfigQuery
  return query
}
