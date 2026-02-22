import * as z from "zod"; 

export interface Hero {
  id: string
  name: string
  alias: string
  powers: string[]
  description: string
  strength: number
  team: string
  image: string
  slug: string
  category:string
  intelligence: number,
  speed: number,
  durability: number,
  status: string,
  firstAppearance:string,
  universe:string
} 

export const HeroSchema = z.object({
  id: z.string(),
  name: z.string(),
  alias: z.string(),
  powers: z.array(z.string()),
  description: z.string(),
  strength: z.number(),
  team: z.string(),
  image: z.string(),
  slug: z.string(),
  category:z.string(),
  intelligence: z.number(),
  speed: z.number(),
  durability: z.number(),
  status: z.string(),
  firstAppearance:z.string(),
  universe:z.string()
})
