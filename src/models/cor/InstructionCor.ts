import { Document } from "../Document";
import { InstructionNode } from "../nodes/InstructionNode";
import { ACor } from "./ACor";
import { ANode } from "../nodes/ANode";

export class InstructionCor extends ACor {

    addNode(doc: Document, s: string): boolean {
        let node: InstructionNode = new InstructionNode(doc.current);


        let match = /^<\?\s*([-_a-zA-Z0-9]+)\s*(.*)\s*\?>$/.exec(s);

        if (match === null) {
            return false;
            //throw SyntaxError("Instruction tag malformed : " + s);
        }


        node.value = match[2];
        node.name = match[1];

        // JXML instruction indentation
        if (/^if$/.test(node.name)) {
            doc.current.childs.push(node);
            doc.current = node;
        }
        else if (/^if-exist$/.test(node.name)) {
            doc.current.childs.push(node);
            doc.current = node;
        }
        else if (/^else$/.test(node.name) && doc.current instanceof ANode) {
            doc.current = doc.current.parent;
            node.parent = doc.current;
            doc.current.childs.push(node);
            doc.current = node;
        }
        else if (/^end-if$/.test(node.name) && doc.current instanceof ANode) {
            doc.current = doc.current.parent;
            node.parent = doc.current;
            doc.current.childs.push(node);
        }
        else if (/^foreach$/.test(node.name)) {
            doc.current.childs.push(node);
            doc.current = node;
        }
        else if (/^end-foreach$/.test(node.name) && doc.current instanceof ANode) {
            doc.current = doc.current.parent;
            node.parent = doc.current;
            doc.current.childs.push(node);
        }
        else {
            doc.current.childs.push(node);
        }

        return true;
    }

    condition(s: string): boolean {
        return /^<\?/.test(s);
    }
}