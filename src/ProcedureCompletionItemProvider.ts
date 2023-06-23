import * as vscode from 'vscode';
import { ProcedureMetaDataSource } from './ProcedureMetaDataSource';

const DOCS_BASE_URI = 'https://github.com/chr1st0scli/RainLisp/blob/master/';

export class ProcedureCompletionItemProvider implements vscode.CompletionItemProvider {

    private procedureCompletionItems: vscode.CompletionItem[];

    public constructor() {

        const procedureMetadataSource = ProcedureMetaDataSource.getDataSource();

        this.procedureCompletionItems = procedureMetadataSource.getProceduresMetadata().map((value: ProcedureMetadata, index: number, array: ProcedureMetadata[]) => {
            const completionItem = new vscode.CompletionItem(value.name, vscode.CompletionItemKind.Function);
            completionItem.detail = value.signature;
            completionItem.commitCharacters = [' '];

            const markdownString = new vscode.MarkdownString(value.documentation);
            markdownString.baseUri = vscode.Uri.parse(DOCS_BASE_URI);
            completionItem.documentation = markdownString;
            
            return completionItem;
        });
    }
    
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {

        return this.procedureCompletionItems;
    }
    
    // resolveCompletionItem?(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
    //     console.log('Entered');
    //     throw new Error('Method not implemented.');
    // }
}