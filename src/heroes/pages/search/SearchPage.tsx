import CustomJomboTron from "@/components/custom/CustomJomboTron"
import SearchBarHero from "@/components/custom/SearchBarHero"
import HeroStats from "@/heroes/components/HeroStats"


function SearchPage() {
  return (
    <>
     {/* Header */}
      <CustomJomboTron title="Superhero Search" description="Discover and manage your favorite superheroes"/>
      
      {/* HeroStats */}
      <HeroStats/>

      <SearchBarHero/>
    </>
  )
}

export default SearchPage