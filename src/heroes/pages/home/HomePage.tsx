import CustomJomboTron from "@/components/custom/CustomJomboTron"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import CustomPagination from "@/components/custom/CustomPagination"
import  CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs"
import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page"


 type Tabs = "All" | "Favorites" | "Villains" | "Heroes"; 

function HomePage() { 

  const {data:heroes} = useQuery({queryKey:["heroes"], queryFn:getHeroesByPageAction}) 

  console.log(heroes);
  

  const [activeTab,setActiveTab] = useState<Tabs>("All");
  return (
    <>
        {/* Header */}
        <CustomJomboTron title="Superhero Database" description="Discover and manage your favorite superheroes"/> 

        <CustomBreadCrumbs items={[
          {href:"/",label:"Home"} 
        ]} 
        current="Home"
        />


        {/* HeroStats */}
        <HeroStats/>  

        <Tabs value={activeTab} className="mb-8">
          <TabsList>
            <TabsTrigger 
            onClick={()=> setActiveTab("All")} 
            value="All">Todos</TabsTrigger>
            <TabsTrigger 
            onClick={()=> setActiveTab("Favorites")} 
            value="Favorites">Favoritos
            </TabsTrigger>

            <TabsTrigger 
            onClick={()=> setActiveTab("Villains")} 
            value="Villains">Villanos
            </TabsTrigger> 

            <TabsTrigger 
            onClick={()=> setActiveTab("Heroes")} 
            value="Heroes">Heroes
            </TabsTrigger> 

          </TabsList>


          <TabsContent value="All">
            <h1>Todos los heroes</h1>
            <HeroGrid/>
          </TabsContent>

          <TabsContent value="Favorites">
            <h1>Favoritos</h1>
            <HeroGrid/>
          </TabsContent>

          <TabsContent value="Villains">
            <h1>Villanos</h1>
            <HeroGrid/>
          </TabsContent>

          <TabsContent value="Heroes">
            <h1>Heroes</h1>
            <HeroGrid/>
          </TabsContent>
      </Tabs> 

      <CustomPagination totalPages={5}/>
    </>
  )
}

export default HomePage