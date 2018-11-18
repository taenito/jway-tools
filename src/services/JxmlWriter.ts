import { Document } from "../models/Document";
import { ANode } from "../models/nodes/ANode";
import { EntityNode } from "../models/nodes/EntityNode";

export class JxmlWriter {

    constructor() {
    }

    newLine: string = "\n";
    indentPattern: string = "\t";

    write(doc: Document): string {
        console.time("write");
        let output: string = "";

        doc.childs.forEach(c => {
            output += this._writeNode(c, 0, c.containsText);
        });

        console.timeEnd("write");
        return output;
    }

    private _writeNode(n: ANode, level: number, oneLineMode: boolean): string {

        if (n === undefined || n === null) {
            throw TypeError("Node cannot be null");
        }

        let output: string = "";

        if (!oneLineMode && n.parent instanceof ANode) {
            if (n.parent.containsText) {
                oneLineMode = true;
            }
        }

        if (!oneLineMode) {
            output += this.indentPattern.repeat(level);
        }

        output += n.toString();

        if (!oneLineMode && !n.containsText) {
            if (n instanceof EntityNode && n.childs.length === 0 && !n.isAutoClose) {
            }
            else {
                output += this.newLine;
            }
        }

        n.childs.forEach(c => {
            let s: string = this._writeNode(c, level + 1, oneLineMode);
            output += s;
        });

        if (n instanceof EntityNode) {
            if (!n.isAutoClose) {

                if (!oneLineMode && !n.containsText) {
                    if (n.childs.length === 0) {
                    }
                    else {
                        output += this.indentPattern.repeat(level);
                    }
                }

                output += "</" + n.name + ">";

                if (!oneLineMode) {
                    output += this.newLine;
                }
            }
        }

        return output;
    }
}
