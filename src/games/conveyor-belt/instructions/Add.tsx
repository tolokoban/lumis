import Runtime from "../runtime"
import {
    InstrAdd,
    InstructionResult,
    InstructionType,
    RuntimeInterface,
} from "../types"
import InstructionManager from "./instruction"

export default class InstrManagerAdd extends InstructionManager {
    get name(): string {
        return "Add"
    }

    get family() {
        return "variable-children"
    }

    get icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>{this.name}</title>
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
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
                    value: previous.value + current.value,
                    cost: previous.cost + current.cost,
                }),
                { value: 0, cost: 0 }
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

    private assertType(data: InstructionType): asserts data is InstrAdd {
        if (data.name !== "Add")
            throw Error(`Expected "Add" but got "${data.name}"!`)
    }
}
