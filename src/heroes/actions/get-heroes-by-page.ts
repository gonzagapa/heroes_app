import type { HeroesResponse } from "@/types/get-heroes-responses";
import { api } from "../api/api.heroes"

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async () =>{
    try {
        const {data} = await api.get<HeroesResponse>("/api/heroes"); 


        const heroes = data.heroes.map(hero => ({...hero, image:`${BASE_URL}/images/${hero.id}.jpeg`}))

        return {...data, heroes};
    } catch (error) {
        console.log(error);
    }
}