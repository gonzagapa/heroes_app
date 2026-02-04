
import  { Link, useLocation } from "react-router"
import  { NavigationMenu,NavigationMenuList  } from "../ui/navigation-menu"
import {NavigationMenuItem,NavigationMenuLink} from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils";

function CustomMenu() {

   const {pathname} = useLocation() 

    const isActive = (path:string) => pathname === path;

    console.log(pathname);
    
   
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2">
            <NavigationMenuLink 
                asChild
                className={cn(isActive("/") && 'bg-slate-300 rounded-md', 'p-2') }>
                <Link to="/">Home</Link>
            </NavigationMenuLink>
            
            <NavigationMenuLink 
                asChild
                className={cn(isActive('/search') && 'bg-slate-300 rounded-md', 'p-2') }>
                <Link to="/search">Search</Link>
            </NavigationMenuLink>

        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default CustomMenu