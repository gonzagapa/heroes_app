import { getSummaryAction } from "./get-summary.action";


describe('getSummaryAction',()=>{
    test("should return summary information",async()=>{
        const data = await getSummaryAction();
        expect(data).toEqual({
            totalHeroes: expect.any(Number),
            strongestHero: expect.any(Object),
            smartestHero: expect.any(Object),
            heroCount: expect.any(Number),
            villainCount: expect.any(Number), 
        })
    })
})