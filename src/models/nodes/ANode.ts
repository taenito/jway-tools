import { Document } from "../Document";

export abstract class ANode {
    constructor(parent: ANode | Document) {
        this.parent = parent;
    }

    parent: ANode | Document;
    childs: ANode[] = [];

    containsText: boolean = false;

    abstract toString(): string;
}