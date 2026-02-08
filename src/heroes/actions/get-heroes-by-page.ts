import type { HeroesResponse } from "@/types/get-heroes-responses";
import { api } from "../api/api.heroes"

const BASE_URL = import.meta.env.VITE_API_URL; 

interface Pagination {
    page: number,
    limit?:number
}

    export const getHeroesByPageAction = async ({page,limit = 6}:Pagination) =>{

        if(isNaN(page)) page = 1;

    try {
        const {data} = await api.get<HeroesResponse>("/api/heroes", {
            params:{
                limit,
                offset: (page - 1) * limit
            }
        }); 


        const heroes = data.heroes.map(hero => ({...hero, image:`${BASE_URL}/images/${hero.id}.jpeg`}))

        return {...data, heroes};
    } catch (error) {
        console.log(error);
    }
}