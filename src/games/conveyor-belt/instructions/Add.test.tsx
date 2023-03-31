import Runtime from "../runtime"

describe("InstrManagerAdd", () => {
    const cases: Array<[expected: number, ...children: number[]]> = [
        [0, 0],
        [3.14, 3.14],
        [-78, 2, -80],
        [45, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ]
    for (const [expected, ...children] of cases) {
        it(`should return value ${expected} for ${children.join(
            " + "
        )})`, () => {
            const runtime = new Runtime()
            const result = runtime.exec({
                name: "Add",
                children: [
                    {
                        name: "Add",
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
