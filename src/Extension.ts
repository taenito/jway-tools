import * as vscode from 'vscode';
import { JxmlFormattingEditProvider } from "./providers/Formatting";

const SCHEME_JXML: string = "file";
const LANG_JXML: string = "jxml";

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider({ scheme: SCHEME_JXML, language: LANG_JXML }, new JxmlFormattingEditProvider())
    );

}

export function deactivate() {
}