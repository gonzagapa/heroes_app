import type { Hero } from "@/types/heroes"
import { api } from "../api/api.heroes"

interface SearchOptions {
    name:string,
    team?:string,
    category?:string,
    universe?:string,
    status?:string,
    strength?:string
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export  const searchHero = async (options:SearchOptions) =>{

    // const {name,team,category,universe, status, strength} = options;
    // if(name == undefined && team == undefined && category == undefined){
    //     return []
    // }

    const {data} = await  api.get<Hero[]>("/api/heroes/search",{
        params:{
            ...options
        }
    })

    return data.map((hero) =>{
        return {
            ...hero,
            image:`${VITE_API_URL}/images/${hero.image}`
        }
    })
}