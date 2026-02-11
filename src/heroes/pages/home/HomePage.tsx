import CustomJomboTron from "@/components/custom/CustomJomboTron"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomPagination from "@/components/custom/CustomPagination"
import  CustomBreadCrumbs from "@/components/custom/CustomBreadCrumbs"
import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page"
import { Spinner } from "@/components/ui/spinner"
import { useSearchParams } from "react-router"
import { useMemo } from "react"
import { useHeroSummary } from "@/hooks/useHeroSummary"


type Tabs = "All" | "Favorites" | "Villains" | "Heroes"; 

function HomePage() { 

  
  let [searchParams, setSearchParams] = useSearchParams(); 
  
  const activeTab = searchParams.get("tab") || 'All';  
  
  const page = searchParams.get("page") ?? '1';
  const limit = searchParams.get("limit") ?? '6';
  
  const selectedTab = useMemo(() => { 
    const validTabs = ["All","Favorites","Villains","Heroes"];
    return validTabs.includes(activeTab) ? activeTab : 'All';
  }, [activeTab]);
  
  const {data:heroesResponse, isLoading} = 
    useQuery({
    queryKey:["heroes",{page,limit}], 
    queryFn:() => getHeroesByPageAction({page: +page,limit: +limit})}) 
  
     

  const {data:summary} = useHeroSummary();
  

  const response = useMemo(() => {
    return heroesResponse?.heroes ?? [];
  }, [heroesResponse]); 

  const villains = response.filter((hero) => hero.category === "Villain"); 

  const heroes = response.filter((hero) => hero.category === "Hero"); 

  if(isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner/>
      </div>
    )
  }
  

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

        <Tabs value={selectedTab} className="mb-8">
          <TabsList>
            <TabsTrigger 
            onClick={()=> setSearchParams((searchParams) => {
              searchParams.set("tab", "All");
              return searchParams;
            })} 
            value="All">Todos {summary?.totalHeroes}</TabsTrigger>
            <TabsTrigger 
            onClick={()=> setSearchParams((searchParams) => {
              searchParams.set("tab", "Favorites");
              return searchParams;
            })} 
            value="Favorites">Favoritos
            </TabsTrigger>

            <TabsTrigger 
            onClick={()=> setSearchParams((searchParams) => {
              searchParams.set("tab", "Villains");
              return searchParams;
            })} 
            value="Villains">Villanos {summary?.villainCount}
            </TabsTrigger> 

            <TabsTrigger 
            onClick={()=> setSearchParams((searchParams) => {
              searchParams.set("tab", "Heroes");
              return searchParams;
            })} 
            value="Heroes">Heroes {summary?.heroCount}
            </TabsTrigger> 

          </TabsList>


          <TabsContent value="All">
            <h1>Todos los heroes</h1>
            <HeroGrid heroes={response}/>
          </TabsContent>

          <TabsContent value="Favorites">
            <h1>Favoritos</h1>
            <HeroGrid heroes={[]}/>
          </TabsContent>

          <TabsContent value="Villains">
            <h1>Villanos</h1>
            <HeroGrid heroes={villains}/>
          </TabsContent>

          <TabsContent value="Heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={heroes}/>
          </TabsContent>
      </Tabs> 

      <CustomPagination totalPages={5}/>
    </>
  )
}

export default HomePage