import { SlashIcon } from "lucide-react"
import  { Link } from "react-router"
import  { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"

interface BreadCrumbItem {
  label: string;
  href: string;
}

interface CustomBreadCrumbsProps {
  items: BreadCrumbItem[]; 
  current:string
}

function CustomBreadCrumbs({items, current}: CustomBreadCrumbsProps) {
  return (
     <Breadcrumb className="mb-8">
      <BreadcrumbList> 

      {items.map((item,index)=>( 
        <BreadcrumbItem key={index}>
          <BreadcrumbLink asChild>
            <Link to={item.href} className={`${current.toLowerCase() === item.label.toLowerCase() ? "text-black font-bold" : ""}`}>{item.label}</Link>
          </BreadcrumbLink>  
          
          {index < items.length - 1 && (
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          )}
        </BreadcrumbItem> 
    ))}

        
       

      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default CustomBreadCrumbs