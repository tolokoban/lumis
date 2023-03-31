import Runtime from "../runtime"

describe("InstrManagerConst", () => {
    for (const expectedValue of [-7, 0, 3.14]) {
        it(`should return value ${expectedValue}`, () => {
            const runtime = new Runtime()
            const result = runtime.exec({
                name: "Const",
                value: expectedValue,
            })
            expect(result.value).toBe(expectedValue)
        })
    }
})
