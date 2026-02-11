import { getSummaryAction } from "@/heroes/actions/get-summary.action";
import { useQuery } from "@tanstack/react-query";


export function useHeroSummary() {
  return useQuery({
        queryKey:["summary-heroes"],
        queryFn:()=> getSummaryAction(),
        staleTime: 1000 * 60 * 5,
      })
}
