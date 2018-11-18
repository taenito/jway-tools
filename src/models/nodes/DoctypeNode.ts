import { ANode } from "./ANode";

export class DoctypeNode extends ANode {

    value: string = "";

    toString(): string {
        return this.value;
    }
}