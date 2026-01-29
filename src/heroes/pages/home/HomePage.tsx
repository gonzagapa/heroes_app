import CustomJomboTron from "@/components/custom/CustomJomboTron"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"


  

function HomePage() {
  return (
    <>
        {/* Header */}
        <CustomJomboTron title="Superhero Database" description="Discover and manage your favorite superheroes"/>


        {/* HeroStats */}
        <HeroStats/>

        {/* Hero Cards Grid */}
        <HeroGrid/>
    </>
  )
}

export default HomePage