import { MemoryRouter } from "react-router"
import { fireEvent, render, screen } from "@testing-library/react"
import { SearchControls } from "./SearchControls"

if(typeof window.ResizeObserver == "undefined"){
    class ResizeObserver{
        disconnect(){}
        observe(){}
        unobserve()
{}    }; 
    window.ResizeObserver = ResizeObserver;
}

const renderComponent = (entries?:string[])=>{
    return render(
    <MemoryRouter initialEntries={entries}>
            <SearchControls/>
    </MemoryRouter>
    )
}

describe('SearchControls.tsx',()=>{
    test('should render with default values',()=>{
        renderComponent(["/?advance-filters=active"]);
        expect(screen.getByTestId('accordion')).toBeDefined();
        expect(screen.getByText('Advanced Filters')).toBeTruthy()
    }); 

    test('should input get default value by query param',()=>{
        renderComponent(['/?name=Superman']); 
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...')
        expect(input.getAttribute('value')).toBe('Superman')
    }); 

    test('should change query params when input change',()=>{
        renderComponent(['/?name=Superman']); 
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...')
         expect(input.getAttribute('value')).toBe('Superman')

        fireEvent.change(input,{target:{value:'Batman'}})
        fireEvent.keyDown(input,{key:'Enter', code:'Enter'})
        
        expect(input.getAttribute('value')).toBe('Batman')
    }); 

    test('should change slider values by user interaction',()=>{
        renderComponent(["/?advance-filters=active"])
        const slider = screen.getByRole('slider');
        expect(slider).toBeDefined(); 

        fireEvent.keyDown(slider,{key:'ArrowRight', code:'ArrowRight'})
        expect(slider.getAttribute('aria-valuenow')).toBe('1')
    })
})