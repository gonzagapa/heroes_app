import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Zap } from 'lucide-react'
import React from 'react'

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


function HeroCardGrid(hero:Hero) {
  return (
     <Card key={hero.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <img src={hero.image || "/placeholder.svg"} alt={hero.alias}  
                className="object-cover w-full h-full" />
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
  )
}

export default HeroCardGrid