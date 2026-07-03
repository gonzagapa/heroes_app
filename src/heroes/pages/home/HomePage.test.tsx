import { fireEvent, render,screen } from "@testing-library/react"
import { HomePage } from "./HomePage"
import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHeroPagination } from "@/heroes/hooks/useHeroPagination";
import { FavoriteHeroesProvider } from "@/heroes/context/FavoriteHeroesContext";


const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
})

vi.mock('@/heroes/hooks/useHeroPagination')
const mockUseHeroPagination = vi.mocked(useHeroPagination);

mockUseHeroPagination.mockReturnValue({
    data: [],
    isLoading:false, 
    isError:false
} as unknown as ReturnType<typeof useHeroPagination>)

const renderEnvironment = (entries?:string[])=>{
    return render(
        <MemoryRouter initialEntries={entries}>
            <FavoriteHeroesProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage/>
                </QueryClientProvider>
            </FavoriteHeroesProvider>
        </MemoryRouter>
    )
}

describe('HomePage',()=>{

    beforeEach(()=>{
        queryClient.clear();
        vi.clearAllMocks()
    })

    test('should render HomePage with default values',()=>{
        const {container} = renderEnvironment(); 
        expect(container).toMatchSnapshot();
    }); 

    test('should call useHeroPagination with default values',()=>{
        renderEnvironment(); 
        expect(mockUseHeroPagination).toHaveBeenCalled();
        expect(mockUseHeroPagination).toHaveBeenCalledWith(1,6,"all");
    }); 

    test('shoudl call useHeroPagination with query params',()=>{
        renderEnvironment(['/?page=2&limit=7&category=villains']); 
        expect(mockUseHeroPagination).toHaveBeenCalledWith(2,7,'villains');
    }); 

    test('should change category value by clicking in tabs',()=>{
        renderEnvironment(['/?page=2&limit=7&category=all']); 
        expect(mockUseHeroPagination).toHaveBeenCalledWith(2,7,'all'); 

        const tabFavoritos = screen.getByTestId('btn-favorito');
        fireEvent.click(tabFavoritos) 

        expect(mockUseHeroPagination).toHaveBeenCalledWith(2,7,'favorites')
    })
})