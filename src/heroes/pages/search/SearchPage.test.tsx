import { render, screen, waitFor } from "@testing-library/react"
import SearchPage from "./SearchPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router"
import { searchHero } from "@/heroes/actions/search-hero.action"
import type { Hero } from "@/types/heroes"

vi.mock('@/heroes/actions/search-hero.action')
vi.mock("@/components/custom/CustomJomboTron",()=>({
    default: ()=> <div data-testid="jumbotron"></div>
}))

vi.mock('./ui/SearchControls',()=>({
    SearchControls:()=>(<div data-testid="search-controls"></div>)
}))

vi.mock('@/heroes/components/HeroGrid',()=>({
    default:({heroes}:{heroes:Hero[]})=>(<div data-tesid="hero-grid">
        {heroes?.map(item =>
             (<div key={item.id}>{item.name}</div>)
            )
        }
    </div>)
}))

const mockSearchHeroAction = vi.mocked(searchHero)

const renderComponent = (entries?:string[])=>{
    return render(
    <MemoryRouter initialEntries={entries}>
        <QueryClientProvider client={queryClient} >
            <SearchPage/>
        </QueryClientProvider>
    </MemoryRouter>
    )
}

const queryClient = new QueryClient({defaultOptions:{
    queries:{
        retry:false
    }
}}) 

const heroes = [
    {id:'1', name:'superman'} as unknown as Hero, 
    {id:'2', name:'batman'} as unknown as Hero
]


describe('SearchPage.tsx', () => { 

   

    beforeEach(()=>{
        queryClient.clear();
        vi.clearAllMocks(); 
    })

    test('should component match snapshot', ()=>{
        const {container} = renderComponent(); 
        expect(container).toMatchSnapshot();
    }); 

    test('should render component with default values',()=>{
        renderComponent();

        expect(screen.getByTestId('jumbotron')).toBeDefined();
        expect(mockSearchHeroAction).toHaveBeenCalledWith({"name":'',"strength":''})
    }); 

    test('should call searchHero action with query name param',()=>{
        renderComponent(["/search?name=superman"]); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({"name":'superman',"strength":''})
    })

    test('should call searchHero action with query strength param',()=>{
        renderComponent(["/search?strength=5"]); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({"name":'',"strength":'5'})
    });

    test('should call searchHero action with query params',()=>{
        renderComponent(["/search?strength=5&name=superman"]); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({"name":'superman',"strength":'5'})
    });  

    test('should render hero items when searchHero is resolved',async()=>{
        mockSearchHeroAction.mockResolvedValue(heroes);
        renderComponent(); 

        await waitFor(()=>{
            expect(screen.getByText('batman')).toBeDefined();
            expect(screen.getByText('superman')).toBeDefined();
        })
    })
 })