import { api } from "./api.heroes";

describe("api.heroes.ts",()=>{
    const BASE_URL:string = import.meta.env.VITE_API_URL;

    test("should configure api base url with port 3001",()=>{
        const url = api.defaults.baseURL;
        expect(url).toBeDefined(); 
        expect(BASE_URL).toContain("3001");
    })
})