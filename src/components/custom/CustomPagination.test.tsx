import { fireEvent, render } from "@testing-library/react"
import CustomPagination from "./CustomPagination"
import { MemoryRouter } from "react-router"
import { screen } from "@testing-library/react"
import type { PropsWithChildren } from "react"

const renderWithRounter = (component:React.ReactElement, initialEntries?:string[])=>{
    return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>)
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

    test("should 'Previous' button has the disabled attribute when page is 1 ",()=>{
         renderWithRounter(<CustomPagination totalPages={5}/>,["/?page=1"])

         const previosButton = screen.getByText('Previous'); 
         const nextButton = screen.getByText('Next');
         expect(previosButton.getAttribute('disabled')).not.toBeNull()
         expect(nextButton.getAttribute('disabled')).toBeNull()
    }); 

    test('should "Next" button has disabled attribute when page equals to total pages',()=>{
        renderWithRounter(<CustomPagination totalPages={5}/>,["/?page=5"])
         const nextButton = screen.getByText('Next');
         expect(nextButton.getAttribute('disabled')).not.toBeNull()
    }); 

    test('should current button page has default variant',()=>{
        renderWithRounter(<CustomPagination totalPages={5}/>,["/?page=3"]); 
        const currentButtonPage = screen.getByText('3');
        const previousButtonPage = screen.getByText('2');
        expect(currentButtonPage.getAttribute('variant')).toBe('default')
        expect(previousButtonPage.getAttribute('variant')).toBe('outline')
    }); 

    test('should change the variant attribute button by click',()=>{
        renderWithRounter(<CustomPagination totalPages={5}/>,["/?page=3"]);
        const currentButtonPage = screen.getByText('3');
        const previousButtonPage = screen.getByText('2');
        expect(currentButtonPage.getAttribute('variant')).toBe('default')
        expect(previousButtonPage.getAttribute('variant')).toBe('outline') 
        
        fireEvent.click(previousButtonPage);
        expect(previousButtonPage.getAttribute('variant')).toBe('default') 
        expect(currentButtonPage.getAttribute('variant')).toBe('outline')
    })



})