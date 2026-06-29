import { getHeroesBySlug } from './get-hero-by-slug.action';
describe("getHeroesBySlug",()=>{
    
    const BASE_URL = import.meta.env.VITE_API_URL; 
    
    test("should return the correct image url format of a hero base on slug",async ()=>{
        const data = await getHeroesBySlug("bruce-wayne");
        expect(data).toHaveProperty('image', `${BASE_URL}/images/${data.id}.jpeg`);
    })

    test("should throw an error by giving it a slug doesnt exist",async ()=>{
        await expect(getHeroesBySlug('error')).rejects.toThrow('Request failed with status code 404');
    })
})