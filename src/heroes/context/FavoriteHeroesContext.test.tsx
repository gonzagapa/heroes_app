import { use } from "react"
import { FavoriteHeroesContext, FavoriteHeroesProvider } from "./FavoriteHeroesContext"
import { render, screen } from "@testing-library/react"

const TestComponent = ()=>{
    const {favoriteCount,favorites} = use(FavoriteHeroesContext)


    return (<div>
        <div data-testid="favorites-count">{favoriteCount}</div>
        <div data-testid="favorites-list">{
        favorites.map(item => (<div data-testid={`hero-${item.name}`} key={item.id}>{item.name}</div>))}</div>
    </div>)
}

const MainWrapper = ()=>{
    return render(<FavoriteHeroesProvider>
        <TestComponent/>
    </FavoriteHeroesProvider>)
}

describe("FavoriteHeroesContext",()=>{
   test("should initialize with the default values",()=>{
        MainWrapper();
        expect(screen.getByTestId("favorites-count").textContent).toBe("0")
        expect(screen.getByTestId("favorites-list").children.length).toBe(0)
   }) 
})