import { api } from "../api/api.heroes"


export const getHeroesByPageAction = async () =>{
    try {
        const {data} = await api.get("/heroes");
        return data;
    } catch (error) {
        console.log(error);
    }
}