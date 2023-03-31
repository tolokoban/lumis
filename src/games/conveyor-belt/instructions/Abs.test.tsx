import Runtime from "../runtime"

describe("InstrManagerAbs", () => {
    const cases: Array<[value: number, expected: number]> = [
        [0, 0],
        [3.14, 3.14],
        [-78, 78],
    ]
    for (const [value, expected] of cases) {
        it(`should return value ${expected} for abs(${value})`, () => {
            const runtime = new Runtime()
            const result = runtime.exec({
                name: "Abs",
                children: [{ name: "Const", value }],
            })
            expect(result.value).toBe(expected)
        })
    }
})
