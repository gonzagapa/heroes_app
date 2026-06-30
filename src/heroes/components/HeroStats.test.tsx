import { render, screen} from "@testing-library/react"
import HeroStats from "./HeroStats"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { HeroesSummary } from "@/types/get-summary.response";
import { FavoriteHeroesProvider } from "../context/FavoriteHeroesContext";

vi.mock("@/heroes/hooks/useHeroSummary"); 

const mockHero = {
        "id": "1",
        "name": "Clark Kent",
        "slug": "clark-kent",
        "alias": "Superman",
        "powers": [
            "Súper fuerza",
            "Vuelo",
            "Visión de calor",
            "Visión de rayos X",
            "Invulnerabilidad",
            "Súper velocidad"
        ],
        "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
        "strength": 10,
        "intelligence": 8,
        "speed": 9,
        "durability": 10,
        "team": "Liga de la Justicia",
        "image": "1.jpeg",
        "firstAppearance": "1938",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
}

const mockUseHeroSummary = vi.mocked(useHeroSummary); 
const mockData = {
    "totalHeroes": 25,
    "strongestHero": {
        "id": "1",
        "name": "Clark Kent",
        "slug": "clark-kent",
        "alias": "Superman",
        "powers": [
            "Súper fuerza",
            "Vuelo",
            "Visión de calor",
            "Visión de rayos X",
            "Invulnerabilidad",
            "Súper velocidad"
        ],
        "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
        "strength": 10,
        "intelligence": 8,
        "speed": 9,
        "durability": 10,
        "team": "Liga de la Justicia",
        "image": "1.jpeg",
        "firstAppearance": "1938",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
    },
    "smartestHero": {
        "id": "2",
        "name": "Bruce Wayne",
        "slug": "bruce-wayne",
        "alias": "Batman",
        "powers": [
            "Artes marciales",
            "Habilidades de detective",
            "Tecnología avanzada",
            "Sigilo",
            "Genio táctico"
        ],
        "description": "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
        "strength": 6,
        "intelligence": 10,
        "speed": 6,
        "durability": 7,
        "team": "Liga de la Justicia",
        "image": "2.jpeg",
        "firstAppearance": "1939",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
    },
    "heroCount": 18,
    "villainCount": 7
}

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
})

const renderComponent = (mockData?:HeroesSummary)=>{

    if(!mockData){
        mockUseHeroSummary.mockReturnValue({
            data:undefined,
        } as unknown as ReturnType<typeof useHeroSummary>)
    }else{
         mockUseHeroSummary.mockReturnValue({
            data:mockData
        } as unknown as ReturnType<typeof useHeroSummary>)
    }
    return render(
    <QueryClientProvider  client={queryClient}>
        <FavoriteHeroesProvider>
            <HeroStats/>
        </FavoriteHeroesProvider>
    </QueryClientProvider>
    )
}

describe("HeroStats",()=>{

    beforeEach(()=>{
        queryClient.clear()
    })

    test("should render component with default values",()=>{
        const {container} =renderComponent();
        expect(container).toMatchSnapshot()
        expect(screen.getByLabelText("Loading"))
    }); 

    test("should render component with mockData returned by usHeroSummary",()=>{
        const {container} =renderComponent(mockData);
        expect(container).toMatchSnapshot()
        expect(screen.getByText("Total Characters")).toBeDefined()
    }); 

    test("should render FavoriteContext data when localstorage has changed", ()=>{
        localStorage.setItem("favorites",JSON.stringify([mockHero]))
        renderComponent(mockData);
        expect(screen.getByTestId("favorite-count").textContent).toBe("1")
        
    })


})