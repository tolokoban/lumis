import Style from "./{{name}}.module.css"

export interface {{name}}Props {
    className?: string
}

export default function {{name}}({ className }: {{name}}Props) {
    return <div className={join(className, Style.{{name}})}></div>
}

function join(...classes: unknown[]): string {
    return classes.filter(cls => typeof cls === "string").join(" ")
}