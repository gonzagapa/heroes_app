import { api } from "../api/api.heroes";
import AxiosMockAdapter from "axios-mock-adapter";
import { getHeroesByPageAction } from "./get-heroes-by-page";

const mockHeroesApi = new AxiosMockAdapter(api);
const BASE_URL = import.meta.env.VITE_API_URL; 

describe('getHeroesByPageAction',()=>{

    beforeEach(()=>{
        mockHeroesApi.reset()
    })

    test('should return the data with image url format',async ()=>{
        mockHeroesApi.onGet('/api/heroes').reply(200, {
            total: 3,
            pages: 1,
            heroes:[
                {
                    id:1,
                    image:'1.jpg'
                },
                {
                    id:2,
                    image:'2.jpg'
                },
                {
                    id:3,
                    image:'3.jpg'
                }
            ]
        }); 

        const data = await getHeroesByPageAction({page:1,limit:3}); 
        expect(data).toStrictEqual({
            total: 3,
            pages: 1,
            heroes:[
                {
                    id:1,
                    image:`${BASE_URL}/images/1.jpeg`
                },
                {
                    id:2,
                    image:`${BASE_URL}/images/2.jpeg`
                },
                {
                    id:3,
                    image:`${BASE_URL}/images/3.jpeg`
                }
            ]
        });
    }); 

    test('should return data when giving a not valid page number',async ()=>{
         mockHeroesApi.onGet('/api/heroes').reply(200, {
            total: 1,
            pages: 1,
            heroes:[]
        }); 
        
        const data = await getHeroesByPageAction({page:'abc' as unknown as number, }); 
        const params = mockHeroesApi.history[0].params;
        expect(data).toStrictEqual({
             total: 1,
            pages: 1,
            heroes:[]
        })
        expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' })
    })

     test('should parse string page param',async ()=>{
         mockHeroesApi.onGet('/api/heroes').reply(200, {
            total: 1,
            pages: 1,
            heroes:[]
        }); 
        
        const data = await getHeroesByPageAction({page:'5' as unknown as number, }); 
        const params = mockHeroesApi.history[0].params;
        expect(data).toStrictEqual({
             total: 1,
            pages: 1,
            heroes:[]
        })
        expect(params).toStrictEqual({ limit: 6, offset: 24, category: 'all' })
    })
})