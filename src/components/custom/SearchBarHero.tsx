import { Plus, Search } from "lucide-react"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import  { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { useState } from "react"
import type { Hero } from "@/types/heroes"
import { initialHeroes } from "@/data/heroes.data"


export function SearchBarHero() {
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

  const handlePowerInput = (powerString: string) => {
    const powers = powerString
      .split(",")
      .map((power) => power.trim())
      .filter((power) => power.length > 0)
    setNewHero({ ...newHero, powers })
  } 

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

  return (
    <>
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
    </>
  )
}

export default SearchBarHero