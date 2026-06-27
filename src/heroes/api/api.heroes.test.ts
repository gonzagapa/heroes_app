import { api } from "./api.heroes";

describe("HeroesAPI",()=>{
    const BASE_URL:string = import.meta.env.VITE_API_URL;

    test("should be configure pointing to the testing server",()=>{
        expect(api.defaults.baseURL).toBeDefined()
        expect(BASE_URL).toContain("3001")
    })
})