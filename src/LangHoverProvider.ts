import { CancellationToken, Hover, HoverProvider, MarkdownString, Position, ProviderResult, TextDocument, Uri } from "vscode";
import { LangMetaDataSource } from "./LangMetaDataSource";

export class LangHoverProvider implements HoverProvider {

    private metadataSource: LangMetaDataSource;

    public constructor() {
        this.metadataSource = LangMetaDataSource.getDataSource();
    }

    provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {

        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            return;
        }

        const word = document.getText(wordRange);
        const metadata = this.metadataSource.getMetadataFor(word);

        if (!metadata) {
            return null;
        }

        const markdownString = new MarkdownString();
        markdownString.appendCodeblock(metadata.signature);
        markdownString.appendMarkdown(metadata.documentation);
        markdownString.baseUri = Uri.parse(LangMetaDataSource.DOCS_BASE_URI);
        
        return new Hover(markdownString, wordRange);
    }
}