import InstructionManager from "../instructions/instruction"
import { InstructionType } from "./language"

export * from "./language"

export interface InstructionResult {
    /** Value returned by the execution. */
    value: number
    /** Cost in energy of the current execution. */
    cost: number
}

export interface RuntimeInterface {
    exec(instruction: InstructionType): InstructionResult

    getManager(name: string): InstructionManager

    /**
     * Look into the children of `instruction` to find the one
     * with given `id`.
     *
     * An id is made of integers separated by dots. The first child of an instruction
     * has index `0`.
     *
     * Example: `0.3.1` is the second child of the fourth child of the given instruction.
     * (if `baseId` is equal to "0").
     *
     * @param instruction
     * @param id
     * @param baseId Default to "0"
     * @returns `undefined` if nothing has been found with this id.
     */
    findInstructionById(
        instruction: InstructionType,
        id: string,
        baseId?: string
    ): InstructionType | undefined
}
