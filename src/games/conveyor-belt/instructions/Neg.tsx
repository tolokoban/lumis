import Runtime from "../runtime"
import {
    InstrNeg,
    InstructionResult,
    InstructionType,
    RuntimeInterface,
} from "../types"
import InstructionManager from "./instruction"

export default class InstrManagerNeg extends InstructionManager {
    get name(): string {
        return "Neg"
    }

    get family() {
        return "uniop"
    }

    get icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>{this.name}</title>
                <path d="M3 7H6V4H8V7H11V9H8V12H6V9H3V7M13 15H21V17H13V15M16.04 3H18.35L7.96 21H5.65L16.04 3Z" />
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
        return { value: -value, cost: cost + 1 }
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

    private assertType(data: InstructionType): asserts data is InstrNeg {
        if (data.name !== "Neg")
            throw Error(`Expected "Neg" but got "${data.name}"!`)
    }
}
