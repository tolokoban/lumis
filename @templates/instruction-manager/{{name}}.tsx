import Runtime from "../runtime"
import { Instr{{name}}, InstructionResult, InstructionType, RuntimeInterface } from "../types"
import InstructionManager from "./instruction"

export default class InstrManager{{name}} extends InstructionManager {
    get name(): string {
        return "{{name}}"
    }

    exec(instruction: InstructionType, runtime: RuntimeInterface): InstructionResult {
        this.assertType(instruction)
        return instruction.children
            .map((child) => runtime.exec(child))
            .reduce(
                (previous, current) => ({
                    value: previous.value + current.value,
                    cost: previous.cost + current.cost,
                }),
                { value: 0, cost: 0 }
            )
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

    private assertType(data: InstructionType): asserts data is Instr{{name}} {
        if (data.name !== "{{name}}")
            throw Error(`Expected "{{name}}" but got "${data.name}"!`)
    }
}
