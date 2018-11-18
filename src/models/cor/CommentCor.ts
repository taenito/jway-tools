import { Document } from "../Document";
import { CommentNode } from "../nodes/CommentNode";
import { ACor } from "./ACor";

export class CommentCor extends ACor {

    addNode(doc: Document, s: string): boolean {
        let node: CommentNode = new CommentNode(doc.current);
        node.value = s;

        doc.current.childs.push(node);

        return true;
    }

    condition(s: string): boolean {
        return /^<!--/.test(s);
    }
}