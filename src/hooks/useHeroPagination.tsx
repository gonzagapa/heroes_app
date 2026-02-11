import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page";
import { useQuery } from "@tanstack/react-query";


export  function useHeroPagination(page:number, limit:number,category:string) {
  return useQuery({
    queryKey:["heroes",{page,limit,category}], 
    queryFn:() => getHeroesByPageAction({page: page,limit: limit, category})}) 
}
