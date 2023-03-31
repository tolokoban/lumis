export type InstructionType =
    | InstrConst
    | InstrNeg
    | InstrAbs
    | InstrAdd
    | InstrMul
    | InstrDiv

interface CommonInstruction {
    name: string
    children?: InstructionType[]
}

export interface InstrConst extends CommonInstruction {
    name: "Const"
    value: number
}
export interface InstrNeg extends CommonInstruction {
    name: "Neg"
    children: InstructionType[]
}
export interface InstrAbs extends CommonInstruction {
    name: "Abs"
    children: InstructionType[]
}
export interface InstrAdd extends CommonInstruction {
    name: "Add"
    children: InstructionType[]
}
export interface InstrMul extends CommonInstruction {
    name: "Mul"
    children: InstructionType[]
}
export interface InstrDiv extends CommonInstruction {
    name: "Div"
    children: InstructionType[]
}
