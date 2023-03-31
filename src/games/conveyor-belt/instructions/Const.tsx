import Runtime from "../runtime"
import {
    InstrConst,
    InstructionResult,
    InstructionType,
    RuntimeInterface,
} from "../types"
import InstructionManager from "./instruction"

export default class InstrManagerConst extends InstructionManager {
    get name(): string {
        return "Const"
    }

    get family() {
        return "no-children"
    }

    get icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>{this.name}</title>
                <path d="M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z" />
            </svg>
        )
    }

    exec(
        instruction: InstructionType,
        runtime: RuntimeInterface
    ): InstructionResult {
        this.assertType(instruction)
        return { value: instruction.value, cost: 1 }
    }

    acceptChild(instruction: InstructionType, childName: string): boolean {
        return false
    }

    isExpandable(instruction: InstructionType): boolean {
        return false
    }

    renderNode(
        instruction: InstructionType,
        onChange: (instruction: InstructionType) => void
    ): JSX.Element {
        this.assertType(instruction)
        return <div>{instruction.value}</div>
    }

    private assertType(data: InstructionType): asserts data is InstrConst {
        if (data.name !== "Const")
            throw Error(`Expected "Const" but got "${data.name}"!`)
    }
}
