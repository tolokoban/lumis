import Runtime from "../../games/conveyor-belt/runtime/runtime"
import { InstructionType } from "../../games/conveyor-belt/types"
import InstructionNode from "../InstructionNode"
import State from "@/state"
import Style from "./CodeEditor.module.css"
import React from "react"

export interface CodeEditorProps {
    className?: string
    instruction: InstructionType
    onChange(newInstruction: InstructionType): void
}

const runtime = new Runtime()

export default function CodeEditor({
    className,
    instruction,
    onChange,
}: CodeEditorProps) {
    const [selection, setSelection] = State.code.selectedInstr.useState()
    React.useEffect(() => {
        // Put the selection on the first root node.
        State.code.selectedInstr.value = "0"
    }, [])
    React.useEffect(() => {
        console.log("🚀 [CodeEditor] selection = ", selection) // @FIXME: Remove this line written on 2023-03-31 at 20:59
        const handleKeyPress = (evt: KeyboardEvent) => {
            switch (evt.key) {
                case "ArrowDown":
                    if (!goNext(selection, setSelection, instruction)) {
                        if (!goIn(selection, setSelection, instruction)) {
                            goOut(selection, setSelection, instruction)
                        }
                    }
                    break
                case "ArrowUp":
                    if (!goPrev(selection, setSelection, instruction)) {
                        goOut(selection, setSelection, instruction)
                    }
                    break
                case "ArrowRight":
                    if (!goIn(selection, setSelection, instruction)) {
                        goNext(selection, setSelection, instruction)
                    }
                    break
                case "ArrowLeft":
                    if (!goOut(selection, setSelection, instruction)) {
                        goPrev(selection, setSelection, instruction)
                    }
                    break
                default:
                    console.log("🚀 [CodeEditor] evt.key = ", evt.key) // @FIXME: Remove this line written on 2023-03-31 at 17:17
            }
        }
        document.addEventListener("keydown", handleKeyPress, true)
        return () =>
            document.removeEventListener("keydown", handleKeyPress, true)
    }, [selection])
    return (
        <div className={join(className, Style.CodeEditor)}>
            <InstructionNode
                id="0"
                instruction={instruction}
                onChange={onChange}
                runtime={runtime}
            />
        </div>
    )
}

function join(...classes: unknown[]): string {
    return classes.filter((cls) => typeof cls === "string").join(" ")
}

const goNext = makeGo(idNext)
const goPrev = makeGo(idPrev)
const goIn = makeGo(idIn)
const goOut = makeGo(idOut)

function makeGo(idFunc: (id: string) => string) {
    return (
        selection: string,
        setSelection: (value: string) => void,
        root: InstructionType
    ): boolean => {
        if (!runtime.findInstructionById(root, selection)) return false

        const id = idFunc(selection)
        if (!runtime.findInstructionById(root, id)) return false

        setSelection(id)
        return true
    }
}

function idNext(id: string): string {
    const indexes = toIndexes(id)
    const last = indexes.pop() ?? 0
    return [...indexes, last + 1].join(".")
}

function idPrev(id: string): string {
    const indexes = toIndexes(id)
    const last = indexes.pop() ?? 0
    return [...indexes, last - 1].join(".")
}

function idIn(id: string): string {
    return `${id}.0`
}

function idOut(id: string): string {
    const indexes = toIndexes(id)
    indexes.pop()
    return indexes.join(".")
}

function toIndexes(id: string): number[] {
    return id.split(".").map((n) => parseInt(n, 10))
}
