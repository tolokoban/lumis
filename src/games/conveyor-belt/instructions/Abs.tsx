import Runtime from "../runtime"
import {
    InstrAbs,
    InstructionResult,
    InstructionType,
    RuntimeInterface,
} from "../types"
import InstructionManager from "./instruction"

export default class InstrManagerAbs extends InstructionManager {
    get name(): string {
        return "Abs"
    }

    get family() {
        return "fixed-children"
    }

    get icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>{this.name}</title>
                <path d="M11 19H9V5H11V19M15 5H13V19H15V5Z" />
            </svg>
        )
    }

    exec(
        instruction: InstructionType,
        runtime: RuntimeInterface
    ): InstructionResult {
        this.assertType(instruction)
        const [first] = instruction.children
        if (!first) return { value: 0, cost: 1 }
        const { value, cost } = runtime.exec(first)
        return { value: Math.abs(value), cost: cost + 1 }
    }

    acceptChild(instruction: InstructionType, childName: string): boolean {
        this.assertType(instruction)
        return instruction.children.length === 0 && childName !== this.name
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

    private assertType(data: InstructionType): asserts data is InstrAbs {
        if (data.name !== "Abs")
            throw Error(`Expected "Abs" but got "${data.name}"!`)
    }
}
