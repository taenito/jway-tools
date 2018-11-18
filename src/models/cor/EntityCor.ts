import { Document } from "../Document";
import { EntityNode } from "../nodes/EntityNode";
import { ACor } from "./ACor";

export class EntityCor extends ACor {

    addNode(doc: Document, s: string): boolean {
        let node: EntityNode = new EntityNode(doc.current);

        // With namespace
        // let match = /(<)((?:([-_a-zA-Z0-9]+)(:))?([-_a-zA-Z0-9:]+))(?=(\s.*)?>)/.exec(s);
        let match = /<([-_a-zA-Z0-9:]+)(?=(\s.*)?>)/.exec(s);

        if (match === null) {
            throw SyntaxError("Entity tag malformed : " + s);

        }

        node.name = match[1];

        let val: string = match[2];
        node.isAutoClose = /\/$/.test(val);
        node.value = node.isAutoClose ? val.substr(0, val.length - 1) : val;

        doc.current.childs.push(node);

        if (!node.isAutoClose) {
            doc.current = node;
        }

        return true;

    }

    condition(s: string): boolean {
        return /^</.test(s);
    }
}