import { ANode } from "./ANode";

export class CommentNode extends ANode {

    value: string = "";

    toString(): string {
        return this.value;
    }
}