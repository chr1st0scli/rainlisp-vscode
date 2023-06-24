import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, CompletionItemProvider, CompletionList, MarkdownString, Position, ProviderResult, TextDocument, Uri } from 'vscode';
import { ProcedureMetaDataSource } from './ProcedureMetaDataSource';

export class ProcedureCompletionItemProvider implements CompletionItemProvider {

    private procedureCompletionItems: CompletionItem[];

    public constructor() {

        const procedureMetadataSource = ProcedureMetaDataSource.getDataSource();

        this.procedureCompletionItems = procedureMetadataSource.getProceduresMetadata().map((value: ProcedureMetadata, index: number, array: ProcedureMetadata[]) => {
            const completionItem = new CompletionItem(value.name, CompletionItemKind.Function);
            completionItem.detail = value.signature;
            completionItem.commitCharacters = [' '];

            const markdownString = new MarkdownString(value.documentation);
            markdownString.baseUri = Uri.parse(ProcedureMetaDataSource.DOCS_BASE_URI);
            completionItem.documentation = markdownString;
            
            return completionItem;
        });
    }

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
        return this.procedureCompletionItems;
    }

    // resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {
    //     throw new Error('Method not implemented.');
    // }
}