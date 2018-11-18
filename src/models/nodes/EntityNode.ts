import { ANode } from "./ANode";

export class EntityNode extends ANode {

    // namespace: string = "";
    // namespaceSeparator: string = "";
    name: string = "";
    value: string = "";
    isAutoClose: boolean = false;

    toString(): string {
        return "<"
            // + (this.namespace !== "" ? this.namespace + this.namespaceSeparator : "")
            + this.name
            + (this.value !== undefined && this.value !== "" ? " " + this.value.trim() : "")
            + (this.isAutoClose ? " /" : "")
            + ">";
    }
}