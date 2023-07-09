import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, CompletionItemProvider, CompletionList, MarkdownString, Position, ProviderResult, TextDocument, Uri } from 'vscode';
import { LangMetaDataSource } from './LangMetaDataSource';
import { LangEntityMetadata, LangEntityType } from './LangEntityMetadata';

export class LangCompletionItemProvider implements CompletionItemProvider {

    public static readonly TRIGGER_CHAR = '(';

    private completionItems: CompletionItem[];

    public constructor() {

        const metadataSource = LangMetaDataSource.getDataSource();

        this.completionItems = metadataSource.getMetadata().map((value: LangEntityMetadata, index: number, array: LangEntityMetadata[]) => {
            const completionItem = new CompletionItem(value.name);

            if (value.type == LangEntityType.Keyword) {
                completionItem.kind = CompletionItemKind.Keyword;
            } else if (value.type == LangEntityType.Constant) {
                completionItem.kind = CompletionItemKind.Constant;
            } else {
                completionItem.kind = CompletionItemKind.Function;
            }

            completionItem.detail = value.signature;

            const markdownString = new MarkdownString(value.documentation);
            markdownString.baseUri = Uri.parse(LangMetaDataSource.DOCS_BASE_URI);
            completionItem.documentation = markdownString;
            
            return completionItem;
        });
    }

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
        return this.completionItems;
    }
}