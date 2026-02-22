import type { Hero } from "@/types/heroes";
import { createContext, useState, type PropsWithChildren } from "react";

interface FavoriteHeroesContext {
   favorites:Hero[],
    favoriteCount:number,

   isFavorite:(hero:Hero)=> boolean, 

   toggleFavorite:(hero:Hero)=> void,
}

export const FavoriteHeroesContext = createContext({} as FavoriteHeroesContext);

export const FavoriteHeroesProvider = ({children}: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>([])

    const toggleFavorite = (hero:Hero)=>{
        const favorite = isFavorite(hero);
        if(favorite){ //si esta en favoritos, eliminarlo
            setFavorites(favorites.filter(favorite => favorite.id !== hero.id))
        }else{ //si no esta en favoritos, agregarlo
            setFavorites([...favorites, hero])
        }
    }

    const isFavorite = (hero:Hero) => favorites.some(favorites => favorites.id === hero.id);

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


