import Style from "./InstructionNode.module.css"
import {
    InstructionType,
    RuntimeInterface,
} from "../../games/conveyor-belt/types"
import State from "@/state"

export interface InstructionNodeProps {
    className?: string
    id: string
    instruction: InstructionType
    onChange(newInstruction: InstructionType): void
    runtime: RuntimeInterface
}

export default function InstructionNode({
    className,
    id,
    instruction,
    onChange,
    runtime,
}: InstructionNodeProps) {
    const [selection, setSelection] = State.code.selectedInstr.useState()
    const manager = runtime.getManager(instruction.name)
    return (
        <div
            className={join(
                className,
                Style.ViewInstructionNode,
                selection === id && Style.selected
            )}
        >
            <header
                style={{
                    "--custom-instruction-color-text": `var(--custom-instruction-color-text-${manager.family})`,
                    "--custom-instruction-color-back": `var(--custom-instruction-color-back-${manager.family})`,
                }}
                onClick={() => setSelection(id)}
            >
                <div className={Style.svg}>{manager.icon}</div>
                <div className={Style.summary}>
                    {manager.renderNode(instruction, onChange)}
                </div>
            </header>
            {manager.isExpandable(instruction) && (
                <main>
                    {manager.getChildren(instruction).map((child, index) => (
                        <InstructionNode
                            id={`${id}.${index}`}
                            key={`${id}.${index}`}
                            runtime={runtime}
                            instruction={child}
                            onChange={(item) => {
                                if (
                                    !instruction.children ||
                                    JSON.stringify(item) ===
                                        JSON.stringify(
                                            instruction.children[index]
                                        )
                                )
                                    return

                                const newChildren = [...instruction.children]
                                newChildren[index] = item
                                onChange({
                                    ...instruction,
                                    children: newChildren,
                                })
                            }}
                        />
                    ))}
                </main>
            )}
        </div>
    )
}

function join(...classes: unknown[]): string {
    return classes.filter((cls) => typeof cls === "string").join(" ")
}
