import Runtime from "../runtime"
import {
    InstrMul,
    InstructionResult,
    InstructionType,
    RuntimeInterface,
} from "../types"
import InstructionManager from "./instruction"

export default class InstrManagerMul extends InstructionManager {
    get name(): string {
        return "Mul"
    }

    get family() {
        return "variable-children"
    }

    get icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>{this.name}</title>
                <path d="M11,3H13V10.27L19.29,6.64L20.29,8.37L14,12L20.3,15.64L19.3,17.37L13,13.72V21H11V13.73L4.69,17.36L3.69,15.63L10,12L3.72,8.36L4.72,6.63L11,10.26V3Z" />
            </svg>
        )
    }

    exec(
        instruction: InstructionType,
        runtime: RuntimeInterface
    ): InstructionResult {
        this.assertType(instruction)
        const { value, cost } = instruction.children
            .map((child) => runtime.exec(child))
            .reduce(
                (previous, current) => ({
                    value: previous.value * current.value,
                    cost: previous.cost + current.cost,
                }),
                { value: 1, cost: 0 }
            )
        return { value, cost: cost + instruction.children.length * 10 }
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

    private assertType(data: InstructionType): asserts data is InstrMul {
        if (data.name !== "Mul")
            throw Error(`Expected "Mul" but got "${data.name}"!`)
    }
}
