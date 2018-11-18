import * as vsc from "vscode";
import { RangeUtil } from "../utils/RangeUtil";
import { JxmlReader } from "../services/JxmlReader";
import { Document } from "../models/Document";
import { JxmlWriter } from "../services/JxmlWriter";


export class JxmlFormattingEditProvider implements vsc.DocumentFormattingEditProvider, vsc.DocumentRangeFormattingEditProvider {
    
    provideDocumentFormattingEdits(document: vsc.TextDocument, options: vsc.FormattingOptions): vsc.TextEdit[] {
        let range = RangeUtil.getRangeForDocument(document);
        
        return this._provideFormattingEdits(document, range, options);
    }
    
    provideDocumentRangeFormattingEdits(document: vsc.TextDocument, range: vsc.Range, options: vsc.FormattingOptions): vsc.TextEdit[] {
        return this._provideFormattingEdits(document, range, options);
    }
    
    private _provideFormattingEdits(document: vsc.TextDocument, range: vsc.Range, options: vsc.FormattingOptions): vsc.TextEdit[] {
          
        let formatter = new JxmlReader();
        let doc: Document = formatter.parse(document.getText(range));

        let writer = new JxmlWriter();
        let jxml: string = writer.write(doc);

        return [ vsc.TextEdit.replace(range, jxml) ];
    }
}