import * as vscode from 'vscode';
import { ProceduresDataSource } from './ProceduresDataSource';

export class RainLispCompletionItemProvider implements vscode.CompletionItemProvider {

    public constructor() {
        //console.log("constructed");
    }
    
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {

        return ProceduresDataSource.getProceduresDataSource().getProceduresMetadata().map((value: PrimitiveProcedure, index: number, array: PrimitiveProcedure[]) => {
            const completionItem = new vscode.CompletionItem(value.name, vscode.CompletionItemKind.Function);
            completionItem.detail = value.signature;
            completionItem.commitCharacters = [' '];

            const markdownString = new vscode.MarkdownString(value.documentation);
            markdownString.baseUri = vscode.Uri.parse('https://github.com/chr1st0scli/RainLisp/blob/master/');
            completionItem.documentation = markdownString;
            
            return completionItem;
        });
    }
    
    // resolveCompletionItem?(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
    //     console.log('Entered');
    //     throw new Error('Method not implemented.');
    // }
}