import { use } from "react"
import { FavoriteHeroesContext, FavoriteHeroesProvider } from "./FavoriteHeroesContext"
import { fireEvent, render, screen } from "@testing-library/react"
import type { Hero } from "@/types/heroes"

const hero = {
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
} as  Hero 

const localStorageMock = {
    getItem:vi.fn(),
    setItem:vi.fn(),
    clear:vi.fn()
}

//override global object localStorage
Object.defineProperty(window,"localStorage",{
    value:localStorageMock
});

const TestComponent = ()=>{
    const {favoriteCount,favorites,isFavorite,toggleFavorite} = use(FavoriteHeroesContext)


    return (<div>
        <div data-testid="favorites-count">{favoriteCount}</div>
        <div data-testid="favorites-list">{
            favorites.map(item => (
            <div data-testid={`hero-${item.name}`} key={item.id}>{item.name}</div>
            ))
            }
        </div>
        <button data-testid="toggle-favorite" onClick={()=>toggleFavorite(hero)}>
            toggle favorite
        </button>

    </div>)
}

const MainWrapper = ()=>{
    return render(<FavoriteHeroesProvider>
        <TestComponent/>
    </FavoriteHeroesProvider>)
}

describe("FavoriteHeroesContext",()=>{

    beforeEach(()=>{
        vi.clearAllMocks();
    })

   test("should initialize with the default values",()=>{
        MainWrapper();
        expect(screen.getByTestId("favorites-count").textContent).toBe("0")
        expect(screen.getByTestId("favorites-list").children.length).toBe(0)
   }) 

   test("should add hero to favorites and localStorage",()=>{
    MainWrapper(); 
    const button = screen.getByTestId("toggle-favorite"); 
    fireEvent.click(button); 
    
    expect(screen.getByTestId("favorites-count").textContent).toBe("1")
    expect(screen.getByTestId("favorites-list").children.length).toBe(1); 

    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    
   })

   test("should remove hero from favorites when toggleFavorite is called 2 times",()=>{
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify([hero]))
    MainWrapper(); 
    const button = screen.getByTestId("toggle-favorite"); 
    
    expect(screen.getByTestId("favorites-count").textContent).toBe("1")
    expect(screen.getByTestId("favorites-list").children.length).toBe(1);


    fireEvent.click(button); 

    expect(screen.getByTestId("favorites-count").textContent).toBe("0")
    expect(screen.getByTestId("favorites-list").children.length).toBe(0)
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites","[]",)
    expect(screen.queryByTestId("hero-1")).toBeNull(); //testing an element that shouldn't exist.

   })
})