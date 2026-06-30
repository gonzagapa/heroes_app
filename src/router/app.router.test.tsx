import { render,screen } from "@testing-library/react";
import { AppRouter } from "./app.router"
import { createMemoryRouter, MemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock("@/heroes/layout/HeroesLayout",()=>({
    HeroesLayout: ()=>(<div data-testid="layout"><Outlet/></div>)
}))

vi.mock("@/heroes/pages/home/HomePage",()=>({
    HomePage: ()=>(<div data-testid="home-page"></div>)
}))

vi.mock("@/admin/pages/AdminPage",()=>({
    default: ()=><div data-testid="admin-page"></div>
}))

vi.mock("@/heroes/pages/hero/HeroPage",()=>({
    HeroPage: ()=>{
         const {slug} = useParams();
        return (<div data-testid="heroes-page">
            HeroSlug-{slug}
        </div>)
    }
}))

describe("AppRouter",()=>{
    test("should render app router as configured",()=>{
        expect(AppRouter.routes).toMatchSnapshot();
    }); 

    test("should render home page at root path",()=>{
        const routes =  createMemoryRouter(AppRouter.routes,{
            initialEntries:["/"]
        })
        render(<RouterProvider router={routes} />)
        expect(screen.getByTestId("home-page")).toBeDefined();
    })

    test("should render admin page at /admin path",async ()=>{
        const routes =  createMemoryRouter(AppRouter.routes,{
            initialEntries:["/admin"]
        })
        render(<RouterProvider router={routes}/>)
        expect(await screen.findByTestId("admin-page"))
    })

    test("should render heroes page with given slug",()=>{
        const routes =  createMemoryRouter(AppRouter.routes,{
            initialEntries:["/heroes/superman"]
        })
         render(<RouterProvider router={routes} />)
         expect(screen.getByTestId("heroes-page")).toBeDefined(); 
         expect(screen.getByTestId("heroes-page").textContent).toContain("superman")
    })
})