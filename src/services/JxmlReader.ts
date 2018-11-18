import { Document } from "../models/Document";
import { ACor } from "../models/cor/ACor";
import { CommentCor } from "../models/cor/CommentCor";
import { DoctypeCor } from "../models/cor/DoctypeCor";
import { EndEntityCor } from "../models/cor/EndEntityCor";
import { InstructionCor } from "../models/cor/InstructionCor";
import { EntityCor } from "../models/cor/EntityCor";
import { TextCor } from "../models/cor/TextCor";

//var colors = require("colors");

export class JxmlReader {

    constructor() {
    }

    newLine: string = "\n";
    indentPattern: string = "\t";

    cor: ACor = new DoctypeCor(new CommentCor(new InstructionCor(new EndEntityCor(new EntityCor(new TextCor())))));

    parse(jxml: string): Document {
        let doc: Document = new Document();
        
        console.time("format");

        jxml = this.minify(jxml, false);

        jxml = jxml.replace(/</g, "~::~<");
        jxml = jxml.replace(/>(?!~::~)/g, ">~::~");
        //jxml = jxml.replace(/>/g, ">~::~");
        //jxml = jxml.replace(/~::~~::~/g, "~::~");

        // remove ~::~ for comment
        jxml = this._cleanComment(jxml);

        jxml = jxml
            .replace(/xmlns\:/g, "~::~xmlns:")
            .replace(/xmlns\=/g, "~::~xmlns=");

        let parts: string[] = jxml.split("~::~");

        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === "" || /^\s+$/.test(parts[i])) {
                continue;
            }

            let success:boolean = this.cor.handle(doc, parts[i]);

            if (!success) {
                parts[i+1] = parts[i] + parts[i+1];
            }
        }

        console.timeEnd("format");
        return doc;
    }

    minify(jxml: string, removeComments?: boolean): string {

        if (typeof removeComments === "undefined") {
            removeComments = false;
        }


        jxml = this._stripLineBreaks(jxml); // all line breaks outside of CDATA elements

        //jxml = jxml.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "");

        //jxml = jxml.replace(/>\s+</g, "><"); // insignificant whitespace between tags

        jxml = jxml.replace(/<\?\s+/g, "<\?"); // spaces between (<?) and tag name
        jxml = jxml.replace(/"\s{2,}(?=[^\s]+=)/g, "\" "); // spaces between attributes
        jxml = jxml.replace(/"\s+(?=>)/g, "\""); // spaces between the last attribute and tag close (>)
        jxml = jxml.replace(/"\s*\/\s*(?=>)/g, "\" /"); // spaces between the last attribute and tag close (/>) and between (/) and (>)
        jxml = jxml.replace(/[^ <>="]\s+[^ <>="]+=/g, (match: string) => { // spaces between the node name and the first attribute
            return match.replace(/\s+/g, " ");
        });

        //jxml = jxml.replace(/\r\n/g, "[\\r\\n]");



        return jxml;
    }

    private _stripLineBreaks(jxml: string): string {
        let output: string = "";
        //let inEntity: boolean = false;
        //let inEntityName: boolean = false;
        let inCdata: boolean = false;
        //let inAttribute: boolean = false;

        for (let i = 0; i < jxml.length; i++) {
            let char: string = jxml.charAt(i);
            let prev: string = jxml.charAt(i - 1);
            let next: string = jxml.charAt(i + 1);

            if (char === "!" && (jxml.substr(i, 8) === "![CDATA[" || jxml.substr(i, 3) === "!--")) {
                inCdata = true;
            }

            else if (char === "]" && (jxml.substr(i, 3) === "]]>")) {
                inCdata = false;
            }

            else if (char === "-" && (jxml.substr(i, 3) === "-->")) {
                inCdata = false;
            }

            else if (char.search(/[\r\n]/g) > -1 && !inCdata) {
                if (/\r/.test(char) && /\S|\r|\n/.test(prev) && /\S|\r|\n/.test(jxml.charAt(i + this.newLine.length))) {
                    output += char;
                }

                else if (/\n/.test(char) && /\S|\r|\n/.test(jxml.charAt(i - this.newLine.length)) && /\S|\r|\n/.test(next)) {
                    output += char;
                }

                continue;
            }

            output += char;
        }

        return output;
    }

    private _cleanComment(jxml: string): string {
        let output: string = "";
        let inComment: boolean = false;

        for (let i = 0; i < jxml.length; i++) {
            let char: string = jxml.charAt(i);

            if (char === "<" && jxml.substr(i, 4) === "<!--") {
                inComment = true;
            }

            else if (char === "-" && jxml.substr(i, 3) === "-->") {
                inComment = false;
            }

            else if (inComment && char === "~" && jxml.substr(i, 4) === "~::~") {
                i += 3;
                continue;
            }

            output += char;
        }

        return output;
    }
}
