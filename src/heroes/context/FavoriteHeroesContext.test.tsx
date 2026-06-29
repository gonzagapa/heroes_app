import { use } from "react"
import { FavoriteHeroesContext, FavoriteHeroesProvider } from "./FavoriteHeroesContext"
import { fireEvent, render, screen } from "@testing-library/react"
import type { Hero } from "@/types/heroes"

const hero = {
    name: "batman",
    id:1
} as unknown as Hero

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
        localStorage.clear()
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

    expect(localStorage.getItem('favorites')).toBe("[{\"name\":\"batman\",\"id\":1}]")
    
   })

   test("should remove hero from favorites when toggleFavorite is called",()=>{
    MainWrapper();  
    const button = screen.getByTestId("toggle-favorite"); 
    fireEvent.click(button); 
    
    expect(screen.getByTestId("favorites-count").textContent).toBe("1")
    expect(screen.getByTestId("favorites-list").children.length).toBe(1);


    fireEvent.click(button); 

    expect(screen.getByTestId("favorites-count").textContent).toBe("0")
    expect(screen.getByTestId("favorites-list").children.length).toBe(0)
    expect(localStorage.getItem("favorites")).toBe("[]")

   })
})