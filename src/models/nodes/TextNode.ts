import { ANode } from "./ANode";

export class TextNode extends ANode {

    value: string = "";

    toString(): string {
        return this.value;
    }
}