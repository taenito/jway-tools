import { Document } from "../Document";
import { ACor } from "./ACor";
import { EntityNode } from "../nodes/EntityNode";

export class EndEntityCor extends ACor {

    addNode(doc: Document, s: string): boolean {

        // <\/([-_a-zA-Z0-9:]+)
        if (doc.current instanceof EntityNode) {

            let match = /<\/([-_a-zA-Z0-9:]+)/.exec(s);

            if (match === null) {
                throw SyntaxError("End Entity tag malformed : " + s);

            }

            let name: string = match[1];


            if (doc.current.name !== name) {
                throw TypeError("Current node's name is not equal to this closing node : " + s  + " (" + doc.current.name + ")");
            }

            doc.current = doc.current.parent;
            return true;
        }
        
        throw TypeError("Current node is not valid entity type : " + doc.current.constructor.name);
    }

    condition(s: string): boolean {
        return /^<\//.test(s);
    }
}