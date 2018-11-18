import { Document } from "../Document";
import { TextNode } from "../nodes/TextNode";
import { ACor } from "./ACor";
import { ANode } from "../nodes/ANode";

export class TextCor extends ACor {

    addNode(doc: Document, s: string): boolean {
        let node: TextNode = new TextNode(doc.current);
        node.value = s;

        doc.current.childs.push(node);

        if (doc.current instanceof ANode) {
            (<ANode>doc.current).containsText = true;
        }

        return true;
    }
    
    condition(s: string): boolean {
        return true;
    }
}