import CustomJomboTron from "@/components/custom/CustomJomboTron"
import HeroStats from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import HeroGrid from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHero } from "@/heroes/actions/search-hero.action"


function SearchPage() {

  const [searchParams,setSearchParams] = useSearchParams();

  const name = searchParams.get("name") ?? "";
  const strength = searchParams.get("strength") ?? "";

  const {data:heroes = []} = useQuery({
    queryKey:["search", {name, strength}],
    queryFn: ()=> searchHero({name,strength}), 
    staleTime: 1000 * 60 * 5 // 5 minutos
  })



  return (
    <>
     {/* Header */}
      <CustomJomboTron title="Superhero Search" description="Discover and manage your favorite superheroes"/>
      
      {/* HeroStats */}
      <HeroStats/>

      <SearchControls/>
      <HeroGrid heroes={heroes}/>
      
    </>
  )
}

export default SearchPage