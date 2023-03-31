import React from "react"
import Runtime from "../../games/conveyor-belt/runtime/runtime"
import { InstructionType } from "../../games/conveyor-belt/types"
import CodeEditor from "../CodeEditor"
import Style from "./App.module.css"

export interface AppProps {
    className?: string
}

const instruction: InstructionType = {
    name: "Mul",
    children: [
        {
            name: "Add",
            children: [
                { name: "Const", value: 3 },
                { name: "Const", value: 7 },
            ],
        },
        {
            name: "Neg",
            children: [{ name: "Const", value: 7 }],
        },
    ],
}

export default function App({ className }: AppProps) {
    const [instr, setInstr] = React.useState(instruction)
    return (
        <div className={join(className, Style.App)}>
            <CodeEditor instruction={instr} onChange={setInstr} />
        </div>
    )
}

function join(...classes: unknown[]): string {
    return classes.filter((cls) => typeof cls === "string").join(" ")
}
