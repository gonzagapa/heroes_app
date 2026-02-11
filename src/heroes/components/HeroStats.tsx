import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import HeroCard from "./HeroCard"
import { Spinner } from "@/components/ui/spinner"
import { useHeroSummary } from "@/hooks/useHeroSummary"

function HeroStats() {

  const {data:summary, isLoading} = useHeroSummary()
  if(isLoading) return <Spinner/>

  return (
   <>
    {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <HeroCard icon={<Users className="h-4 w-4 text-muted-foreground" />} 
          title="Total Characters">
            <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {summary?.heroCount} Heroes
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  {summary?.villainCount} Villains
                </Badge>
              </div>
          </HeroCard>
          <HeroCard title="Favorites" icon={<Heart className="h-4 w-4 text-muted-foreground" />}>
             <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">18.8% of total</p>
          </HeroCard>
          <HeroCard title="Strongest" icon={<Zap className="h-4 w-4 text-muted-foreground" />}>
                <div className="text-lg font-bold">{summary?.strongestHero.name}</div>
                <p className="text-xs text-muted-foreground">Strength: 10/10</p>
          </HeroCard>
          <HeroCard title="Smartest" icon={<Trophy className="h-4 w-4 text-muted-foreground" />}>
             <div className="text-lg font-bold">{summary?.smartestHero.name}</div>
              <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
          </HeroCard>
        </div>
   </>
  )
}

export default HeroStats