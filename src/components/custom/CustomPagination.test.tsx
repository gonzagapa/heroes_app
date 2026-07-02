import { render } from "@testing-library/react"
import CustomPagination from "./CustomPagination"
import { MemoryRouter } from "react-router"
import { screen } from "@testing-library/react"
import type { PropsWithChildren } from "react"

const renderWithRounter = (component:React.ReactElement)=>{
    return render(<MemoryRouter>{component}</MemoryRouter>)
}

vi.mock('../ui/button',()=>({
    Button: ({children, ...props}:PropsWithChildren)=>{
        return (<button {...props}>{children}</button>)
    }
}))

describe("CustomPagination",()=>{
    test("should render with default values",()=>{
        renderWithRounter(<CustomPagination totalPages={5}/>)

       expect(screen.getByText('Previous')).toBeDefined(); 
       expect(screen.getAllByText("Next")).toBeDefined();

       expect(screen.getAllByText("1")).toBeDefined();
       expect(screen.getAllByText("2")).toBeDefined();
       expect(screen.getAllByText("3")).toBeDefined();
       expect(screen.getAllByText("4")).toBeDefined();
       expect(screen.getAllByText("5")).toBeDefined();
    }); 


})