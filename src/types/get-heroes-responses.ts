import type { Hero } from "./heroes";

export interface HeroesResponse {
    total:  number;
    pages:  number;
    heroes: Hero[];
}


