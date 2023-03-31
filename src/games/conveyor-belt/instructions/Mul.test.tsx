import Runtime from "../runtime"

describe("InstrManagerMul", () => {
    const cases: Array<[expected: number, ...children: number[]]> = [
        [0, 0],
        [3.14, 3.14],
        [-72, 2, -36],
        [120, 1, 2, 3, 4, 5],
        [-120, 1, 2, -3, 4, 5],
        [120, 1, -2, 3, -4, 5],
    ]
    for (const [expected, ...children] of cases) {
        it(`should return value ${expected} for ${children.join(
            " * "
        )})`, () => {
            const runtime = new Runtime()
            const result = runtime.exec({
                name: "Mul",
                children: [
                    {
                        name: "Mul",
                        children: children.map((value) => ({
                            name: "Const",
                            value,
                        })),
                    },
                ],
            })
            expect(result.value).toBe(expected)
        })
    }
})
