import Runtime from "../runtime"
import {
    InstrDiv,
    InstructionResult,
    InstructionType,
    RuntimeInterface,
} from "../types"
import InstructionManager from "./instruction"

export default class InstrManagerDiv extends InstructionManager {
    get name(): string {
        return "Div"
    }

    get family() {
        return "variable-children"
    }

    get icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>{this.name}</title>
                <path d="M19,13H5V11H19V13M12,5A2,2 0 0,1 14,7A2,2 0 0,1 12,9A2,2 0 0,1 10,7A2,2 0 0,1 12,5M12,15A2,2 0 0,1 14,17A2,2 0 0,1 12,19A2,2 0 0,1 10,17A2,2 0 0,1 12,15Z" />
            </svg>
        )
    }

    exec(
        instruction: InstructionType,
        runtime: RuntimeInterface
    ): InstructionResult {
        this.assertType(instruction)
        const children = [...instruction.children]
        while (children.length < 2) children.push({ name: "Const", value: 1 })
        const [childA, childB] = children
        const a = runtime.exec(childA)
        const b = runtime.exec(childB)
        return {
            value: a.value / b.value,
            cost: 1000 + a.cost + b.cost,
        }
    }

    acceptChild(instruction: InstructionType, childName: string): boolean {
        return true
    }

    isExpandable(instruction: InstructionType): boolean {
        return true
    }

    renderNode(
        instruction: InstructionType,
        onChange: (instruction: InstructionType) => void
    ): JSX.Element {
        this.assertType(instruction)
        return <div>{this.name}</div>
    }

    private assertType(data: InstructionType): asserts data is InstrDiv {
        if (data.name !== "Div")
            throw Error(`Expected "Div" but got "${data.name}"!`)
    }
}
