"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Zap, Shield, Heart } from "lucide-react"
import CustomJomboTron from "@/components/custom/CustomJomboTron"

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

function HomePage() {
  const [heroes, setHeroes] = useState<Hero[]>(initialHeroes)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newHero, setNewHero] = useState<Omit<Hero, "id">>({
    name: "",
    alias: "",
    powers: [],
    description: "",
    strength: 5,
    team: "",
    image: "/placeholder.svg?height=200&width=200",
  })

  const filteredHeroes = heroes.filter(
    (hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.powers.some((power) => power.toLowerCase().includes(searchTerm.toLowerCase())) ||
      hero.team.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddHero = () => {
    if (newHero.name && newHero.alias) {
      const hero: Hero = {
        ...newHero,
        id: Date.now().toString(),
        powers: newHero.powers.length > 0 ? newHero.powers : ["Unknown Power"],
      }
      setHeroes([...heroes, hero])
      setNewHero({
        name: "",
        alias: "",
        powers: [],
        description: "",
        strength: 5,
        team: "",
        image: "/placeholder.svg?height=200&width=200",
      })
      setIsDialogOpen(false)
    }
  }

  const handlePowerInput = (powerString: string) => {
    const powers = powerString
      .split(",")
      .map((power) => power.trim())
      .filter((power) => power.length > 0)
    setNewHero({ ...newHero, powers })
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

  return (
    <>
      <>
        {/* Header */}
        <CustomJomboTron title="Superhero Database" description="Discover and manage your favorite superheroes"/>

        {/* Search and Add Hero Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search heroes by name, alias, powers, or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Hero
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Hero</DialogTitle>
                <DialogDescription>Create a new superhero profile with their details and abilities.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Real Name</Label>
                  <Input
                    id="name"
                    value={newHero.name}
                    onChange={(e) => setNewHero({ ...newHero, name: e.target.value })}
                    placeholder="e.g., Peter Parker"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alias">Hero Alias</Label>
                  <Input
                    id="alias"
                    value={newHero.alias}
                    onChange={(e) => setNewHero({ ...newHero, alias: e.target.value })}
                    placeholder="e.g., Spider-Man"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="powers">Powers (comma-separated)</Label>
                  <Input
                    id="powers"
                    value={newHero.powers.join(", ")}
                    onChange={(e) => handlePowerInput(e.target.value)}
                    placeholder="e.g., Super Strength, Flight, Heat Vision"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team">Team</Label>
                  <Select value={newHero.team} onValueChange={(value) => setNewHero({ ...newHero, team: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Justice League">Justice League</SelectItem>
                      <SelectItem value="Avengers">Avengers</SelectItem>
                      <SelectItem value="X-Men">X-Men</SelectItem>
                      <SelectItem value="Fantastic Four">Fantastic Four</SelectItem>
                      <SelectItem value="Teen Titans">Teen Titans</SelectItem>
                      <SelectItem value="Solo">Solo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="strength">Strength Level (1-10)</Label>
                  <Input
                    id="strength"
                    type="number"
                    min="1"
                    max="10"
                    value={newHero.strength}
                    onChange={(e) => setNewHero({ ...newHero, strength: Number.parseInt(e.target.value) || 5 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newHero.description}
                    onChange={(e) => setNewHero({ ...newHero, description: e.target.value })}
                    placeholder="Brief description of the hero..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddHero}>Add Hero</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredHeroes.length} of {heroes.length} heroes
          </p>
        </div>

        {/* Hero Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHeroes.map((hero) => (
            <Card key={hero.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <img src={hero.image || "/placeholder.svg"} alt={hero.alias}  
                className="object-cover" />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                  <span className={`font-semibold ${getStrengthColor(hero.strength)}`}>{hero.strength}</span>
                  <span className={getStrengthColor(hero.strength)}>{getStrengthIcon(hero.strength)}</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{hero.alias}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">{hero.name}</CardDescription>
                  </div>
                  <Badge variant="secondary">{hero.team}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{hero.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Powers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hero.powers.slice(0, 3).map((power, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {power}
                      </Badge>
                    ))}
                    {hero.powers.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hero.powers.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredHeroes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No heroes found</h3>
            <p className="text-gray-600">Try adjusting your search terms or add a new hero to the database.</p>
          </div>
        )}
      </>
    </>
  )
}

export default HomePage