import { getSummaryAction } from "./get-summary.action"

describe("getSummaryAction",()=>{
    test("should fetch summary info of heroes info",async ()=>{
        const data = await getSummaryAction();

        expect(data).toHaveProperty("totalHeroes"); 
        expect(data).toHaveProperty("strongestHero"); 
        expect(data).toHaveProperty("smartestHero"); 
        expect(data).toHaveProperty("heroCount"); 
        expect(data).toHaveProperty("villainCount"); 

    })
})