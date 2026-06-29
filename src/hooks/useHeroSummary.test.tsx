import {renderHook, waitFor} from '@testing-library/react'
import { useHeroSummary } from './useHeroSummary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react' 
import { getSummaryAction } from '@/heroes/actions/get-summary.action'
import type { Hero } from '@/types/heroes'


vi.mock('@/heroes/actions/get-summary.action',()=>({
        getSummaryAction: vi.fn()
}))

const mockeGetSummaryAction = vi.mocked(getSummaryAction)

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
})

const customWrapper = ({children}:PropsWithChildren)=>{
    return (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
}

describe("useHeroSummary",()=>{

    beforeEach(()=>{
        mockeGetSummaryAction.mockReset()
        queryClient.clear() //Limpiamos la cache en cada test de react query
    })

    test("should return initial state date (isLoading=true)",()=>{
        const {result} = renderHook(()=> useHeroSummary(), {wrapper:customWrapper}); 
        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBeUndefined();
    }); 

    test("should be a succesfull api call",async ()=>{

        const mockDataResult = {
             heroCount:3, 
            totalHeroes:5, 
            villainCount:4, 
            smartestHero:{} as Hero, 
            strongestHero:{} as Hero
        }

        mockeGetSummaryAction.mockResolvedValue(mockDataResult)
         const {result} = renderHook(()=> useHeroSummary(), {wrapper:customWrapper});  

         await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
         })

         expect(result.current.data).toStrictEqual(mockDataResult)
         expect(result.current.isError).toStrictEqual(false)
    })

    test("should throw an Error when API call fail",async ()=>{
        const mockError = new Error("API call failed"); 

         mockeGetSummaryAction.mockRejectedValue(mockError)
         const {result} = renderHook(()=> useHeroSummary(), {wrapper:customWrapper});  

         await waitFor(()=>{
            expect(result.current.isError).toBe(true)
         })

         expect(result.current.error).toBeDefined(); 
    })
})