import { InstructionResult, InstructionType, RuntimeInterface } from "../types"
import InstructionManager from "../instructions/instruction"
import InstrManagerAbs from "../instructions/Abs"
import InstrManagerAdd from "../instructions/Add"
import InstrManagerConst from "../instructions/Const"
import InstrManagerMul from "../instructions/Mul"
import InstrManagerDiv from "../instructions/Div"
import InstrManagerNeg from "../instructions/Neg"

const INSTRUCTIONS: InstructionManager[] = [
    new InstrManagerAbs(),
    new InstrManagerAdd(),
    new InstrManagerConst(),
    new InstrManagerDiv(),
    new InstrManagerMul(),
    new InstrManagerNeg(),
]

export interface RuntimeOptions {
    bankSize: number
    banksCount: number
}

export default class Runtime implements RuntimeInterface {
    private readonly options: RuntimeOptions

    private readonly managers = new Map<string, InstructionManager>()

    private readonly memoryBanks: number[][] = []

    constructor(options: Partial<RuntimeOptions> = {}) {
        for (const manager of INSTRUCTIONS) {
            this.managers.set(manager.name, manager)
        }
        this.options = {
            bankSize: 16,
            banksCount: 16,
            ...options,
        }
        const { bankSize, banksCount } = this.options
        for (let index = 0; index < banksCount; index++) {
            const bank: number[] = []
            for (let offset = 0; offset < bankSize; offset++) bank.push(0)
            this.memoryBanks.push(bank)
        }
    }

    findInstructionById(
        instruction: InstructionType,
        id: string,
        baseId = "0"
    ): InstructionType | undefined {
        if (!id.startsWith(baseId)) return undefined

        const indexes = id
            .substring(baseId.length + 1)
            .split(".")
            .map((item) => parseInt(item))
            .filter((num) => !Number.isNaN(num))
        if (indexes.length === 0) return instruction

        let current = instruction
        for (const index of indexes) {
            if (!Array.isArray(current.children)) return undefined

            current = current.children[index]
            if (!current) return undefined
        }
        return current
    }

    getManager(name: string): InstructionManager {
        const manager = this.managers.get(name)
        if (!manager) throw Error(`No InstructionManager with name "${name}"!`)
        return manager
    }

    exec(instruction: InstructionType): InstructionResult {
        const manager = this.managers.get(instruction.name)
        if (!manager) {
            console.error("Unknown instruction:", instruction)
            return { value: 0, cost: 1 }
        }

        return manager.exec(instruction, this)
    }
}
