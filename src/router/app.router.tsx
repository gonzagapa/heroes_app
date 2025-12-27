import AdminLayout from "@/admin/layout/AdminLayout";
// import AdminPage from "@/admin/pages/AdminPage";
import HeroesLayout from "@/heroes/layout/HeroesLayout";
import HeroPage from "@/heroes/pages/hero/HeroPage";
import HomePage from "@/heroes/pages/home/HomePage";
// import SearchPage from "@/heroes/pages/search/SearchPage";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const SearchPage = lazy(()=> import("@/heroes/pages/search/SearchPage"))
const AdminPage = lazy(()=>import("@/admin/pages/AdminPage"))

export const AppRouter = createBrowserRouter([
    {
        path:'/',
        Component:HeroesLayout,
        children:[
            {
                index:true,
                Component:HomePage,
            },
            {
                path:'heroes',
                Component:HeroPage
            },
            {
                path:'search',
                Component:SearchPage
            },
        ]
    },
{
    path:'/admin',
    Component:AdminLayout,
    children:[
        {
            index:true,
            Component:AdminPage
        }
    ]
}

]);