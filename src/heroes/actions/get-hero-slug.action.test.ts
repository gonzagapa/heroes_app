import { getHeroesBySlug } from "./get-hero-by-slug.action";

describe("getHeroAction",()=>{
    const BASE_URL = import.meta.env.VITE_API_URL; 

    test("should fetch hero data and return with complete image url",async()=>{
        const data = await getHeroesBySlug("bruce-wayne"); 
        expect(data).toBeDefined(); 
        expect(data).toHaveProperty("image",`${BASE_URL}/images/${data.id}.jpeg`); 
    }); 

    test("should throw an error if hero is not found",async()=>{
        const idSlug = "bruce-wee";

        await expect(getHeroesBySlug(idSlug)).rejects.toThrow("Request failed with status code 404");
    })
})