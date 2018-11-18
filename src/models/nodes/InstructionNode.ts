import { ANode } from "./ANode";

export class InstructionNode extends ANode {

    name: string = "";
    value: string = "";

    toString(): string {
        return "<?"
            + this.name.trim()
            + (this.value !== undefined && this.value !== "" ? " " + this.value.trim() : "")
            + "?>";
    }
}