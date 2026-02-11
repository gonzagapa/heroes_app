import type { Hero } from "@/types/heroes"
import { api } from "../api/api.heroes"

const BASE_URL = import.meta.env.VITE_API_URL; 

export const getHeroesBySlug = async (slug:string) =>{

    const {data} = await api.get<Hero>(`/api/heroes/${slug}`)
    return {
        ...data,
        image: `${BASE_URL}/images/${data.id}.jpeg`
    }
}