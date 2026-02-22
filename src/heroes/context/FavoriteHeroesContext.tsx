import { HeroSchema, type Hero } from "@/types/heroes";
import * as z from "zod"; 
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

interface FavoriteHeroesContext {
   favorites:Hero[],
    favoriteCount:number,

   isFavorite:(hero:Hero)=> boolean, 

   toggleFavorite:(hero:Hero)=> void,
}

const key = 'favorites'

//1. creamos el contexto
export const FavoriteHeroesContext = createContext({} as FavoriteHeroesContext);

const getFavoritesFromLocalStorage = ():Hero[] =>{
    const favorites = localStorage.getItem(key);
    const resultParsed = HeroSchema.array().safeParse(JSON.parse(favorites || '[]'))
    return resultParsed.success ? resultParsed.data: [];

}

//2. creamos el provider
export const FavoriteHeroesProvider = ({children}: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage())

    const toggleFavorite = (hero:Hero)=>{
        const favorite = isFavorite(hero);
        if(favorite){ //si esta en favoritos, eliminarlo
            setFavorites(favorites.filter(favorite => favorite.id !== hero.id))
        }else{ //si no esta en favoritos, agregarlo
            setFavorites([...favorites, hero])
        }
    }

    const isFavorite = (hero:Hero) => favorites.some(favorites => favorites.id === hero.id);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroesContext.Provider value={
            {
                favorites:favorites,
                favoriteCount:favorites.length,
                isFavorite:isFavorite,
                toggleFavorite:toggleFavorite
            }
        }>
            {children}
        </FavoriteHeroesContext.Provider>
    )
}


