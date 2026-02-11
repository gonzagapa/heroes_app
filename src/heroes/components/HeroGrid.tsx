import { useState } from 'react'
import HeroCardGrid from './HeroCardGrid'
import type { Hero } from '@/types/heroes'

   

interface HeroGrid {
  heroes:Hero[]
}

function HeroGrid({heroes}:HeroGrid) {
      
    
const [heroesList, setHeroes] = useState<Hero[]>(heroes)

  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroesList.map((hero) => (
          <HeroCardGrid key={hero.id} {...hero}/>
          ))}
        </div>
  )
}

export default HeroGrid