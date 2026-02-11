import { getHeroesBySlug } from "@/heroes/actions/get-hero-by-slug.action";
import { useQuery } from "@tanstack/react-query";


export  function useHeroBySlug(slug:string) {
  return useQuery({
    queryKey:["hero",slug],
    queryFn: ()=>getHeroesBySlug(slug)
  })
}
