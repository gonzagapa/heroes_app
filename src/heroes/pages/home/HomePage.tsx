"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Search, Plus} from "lucide-react"
import CustomJomboTron from "@/components/custom/CustomJomboTron"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"


  

function HomePage() {
  return (
    <>
      <>
        {/* Header */}
        <CustomJomboTron title="Superhero Database" description="Discover and manage your favorite superheroes"/>

        {/* HeroStats */}
        <HeroStats/>

        {/* Search and Add Hero Section */}

        {/* Hero Cards Grid */}
        <HeroGrid/>

      </>
    </>
  )
}

export default HomePage