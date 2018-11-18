import { Document } from "../Document";
import { DoctypeNode } from "../nodes/DoctypeNode";
import { ACor } from "./ACor";

export class DoctypeCor extends ACor {

    addNode(doc: Document, s: string): boolean {
        let node: DoctypeNode = new DoctypeNode(doc.current);
        node.value = s;

        doc.current.childs.push(node);

        return true;
    }

    condition(s: string): boolean {
        return /^<!DOCTYPE /.test(s);
    }
}