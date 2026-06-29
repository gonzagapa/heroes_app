import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { useHeroPagination } from "./useHeroPagination"

vi.mock("@/heroes/actions/get-heroes-by-page",()=>({
    getHeroesByPageAction:vi.fn() 
})) 

const mockgetHeroesAction = vi.mocked(getHeroesByPageAction)

const customWrapper = ({children}:PropsWithChildren)=>{
    const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
})

    return (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
}


describe("useHeroPagination",()=>{

    beforeEach(()=>{
        vi.clearAllMocks()
    })

    test("should return isSuccess equals true when API is called",async ()=>{

        const mockReturnData = {
            total:  12,
            pages:  1,
            heroes: [],
        } 

        mockgetHeroesAction.mockResolvedValue(mockReturnData); 
        const {result} = renderHook(()=> useHeroPagination(1,6,"all"), {wrapper:customWrapper}); 
        
        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true); 
        })

        expect(result.current.data).toStrictEqual(mockReturnData)
    });  

    test("should getHeroesByPageAction called with the given params",async ()=>{
      const mockReturnData = {
            total:  12,
            pages:  1,
            heroes: [],
        } 

        mockgetHeroesAction.mockResolvedValue(mockReturnData); 
        const {result} = renderHook(()=> useHeroPagination(1,6,"all"),{wrapper:customWrapper}); 
        
        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true); 
        })

        expect(mockgetHeroesAction).toHaveBeenCalled(); 
        expect(mockgetHeroesAction).toHaveBeenCalledWith({
                    category: "all",
                    limit: 6,
                    page: 1 
                });  
        })



})