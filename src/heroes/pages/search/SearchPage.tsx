import CustomJomboTron from "@/components/custom/CustomJomboTron"
import HeroStats from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"


function SearchPage() {
  return (
    <>
     {/* Header */}
      <CustomJomboTron title="Superhero Search" description="Discover and manage your favorite superheroes"/>
      
      {/* HeroStats */}
      <HeroStats/>

      <SearchControls/>
    </>
  )
}

export default SearchPage