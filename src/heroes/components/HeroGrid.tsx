import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Heart, Shield, Zap } from 'lucide-react'
import { useState } from 'react'
import HeroCardGrid from './HeroCardGrid'


interface Hero {
  id: string
  name: string
  alias: string
  powers: string[]
  description: string
  strength: number
  team: string
  image: string
}

 const getStrengthColor = (strength: number) => {
    if (strength >= 9) return "text-red-500"
    if (strength >= 7) return "text-orange-500"
    if (strength >= 5) return "text-yellow-500"
    return "text-green-500"
  }

  const getStrengthIcon = (strength: number) => {
    if (strength >= 9) return <Zap className="h-4 w-4" />
    if (strength >= 7) return <Shield className="h-4 w-4" />
    return <Heart className="h-4 w-4" />
  }

   const initialHeroes: Hero[] = [
  {
    id: "1",
    name: "Clark Kent",
    alias: "Superman",
    powers: ["Super Strength", "Flight", "Heat Vision", "X-Ray Vision"],
    description: "The Last Son of Krypton, protector of Earth and symbol of hope.",
    strength: 10,
    team: "Justice League",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Bruce Wayne",
    alias: "Batman",
    powers: ["Martial Arts", "Detective Skills", "Advanced Technology"],
    description: "The Dark Knight of Gotham City, using fear as a weapon against crime.",
    strength: 8,
    team: "Justice League",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Diana Prince",
    alias: "Wonder Woman",
    powers: ["Super Strength", "Flight", "Lasso of Truth", "Combat Skills"],
    description: "Amazonian princess and warrior, champion of truth and justice.",
    strength: 9,
    team: "Justice League",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Barry Allen",
    alias: "The Flash",
    powers: ["Super Speed", "Time Travel", "Speed Force"],
    description: "The Fastest Man Alive, protector of Central City.",
    strength: 7,
    team: "Justice League",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Peter Parker",
    alias: "Spider-Man",
    powers: ["Wall Crawling", "Spider Sense", "Web Shooting", "Super Agility"],
    description: "Your friendly neighborhood Spider-Man, with great power comes great responsibility.",
    strength: 7,
    team: "Avengers",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Tony Stark",
    alias: "Iron Man",
    powers: ["Powered Armor", "Genius Intellect", "Advanced Technology"],
    description: "Billionaire genius inventor who uses his technology to protect the world.",
    strength: 8,
    team: "Avengers",
    image: "/placeholder.svg?height=200&width=200",
  },
]

function HeroGrid() {
      
    
const [heroes, setHeroes] = useState<Hero[]>(initialHeroes)

 const [searchTerm, setSearchTerm] = useState("")

  const filteredHeroes = heroes.filter(
    (hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.powers.some((power) => power.toLowerCase().includes(searchTerm.toLowerCase())) ||
      hero.team.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHeroes.map((hero) => (
          <HeroCardGrid key={hero.id} {...hero}/>
          ))}
        </div>
  )
}

export default HeroGrid