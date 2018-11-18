import { Document } from "../Document";

export abstract class ACor {

    constructor(next?: ACor) {
        this.next = next;
    }


    next?: ACor;

    handle(doc: Document, s: string): boolean {
        if (this.condition(s)) {
            return this.addNode(doc, s);
        }
        
        if (this.next !== undefined) {
            return this.next.handle(doc, s);
        }

        return false;
    }

    abstract addNode(doc: Document, s: string): boolean;
    
    abstract condition(s: string): boolean;
}
