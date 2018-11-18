import { ANode } from "./nodes/ANode";

export class Document {
    constructor() {
    }

    childs: ANode[] = [];
    current: Document | ANode = this;
}