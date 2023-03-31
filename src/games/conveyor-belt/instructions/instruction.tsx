import runtime from "../runtime"
import { InstructionResult, InstructionType } from "../types"

/**
 * Every instruction returns a value.
 */
export default abstract class InstructionManager {
    abstract get name(): string

    abstract get icon(): JSX.Element

    /**
     * An instruction can be part of a family.
     * All instructions of a same family share a common color.
     * This color is used in the tree and in the icon background.
     *
     * The CSS variables that hold the colors are called:
     * * `--custom-instruction-color-text-${family}`
     * * `--custom-instruction-color-back-${family}`
     */
    abstract get family(): string

    abstract exec(
        instruction: InstructionType,
        runtime: runtime
    ): InstructionResult

    /**
     * Check if we can add a node of name `childName` to this node.
     */
    abstract acceptChild(
        instruction: InstructionType,
        childName: string
    ): boolean

    /**
     * Check if the current instruction is expandable in the tree.
     */
    abstract isExpandable(instruction: InstructionType): boolean

    renderNode(
        instruction: InstructionType,
        onChange: (instruction: InstructionType) => void
    ): JSX.Element {
        return <div>{instruction.name}</div>
    }

    getChildren(instruction: InstructionType): InstructionType[] {
        return instruction.children ?? []
    }
}
