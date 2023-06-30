import { CancellationToken, Hover, HoverProvider, MarkdownString, Position, ProviderResult, TextDocument, Uri } from "vscode";
import { ProcedureMetaDataSource } from "./ProcedureMetaDataSource";

export class ProcedureHoverProvider implements HoverProvider {

    private metadataSource: ProcedureMetaDataSource;

    public constructor() {
        this.metadataSource = ProcedureMetaDataSource.getDataSource();
    }

    provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {

        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            return;
        }

        const word = document.getText(wordRange);
        const procedureMetadata = this.metadataSource.getProcedureMetadata(word);

        if (!procedureMetadata) {
            return null;
        }

        const markdownString = new MarkdownString();
        markdownString.appendCodeblock(procedureMetadata.signature);
        markdownString.appendMarkdown(procedureMetadata.documentation);
        markdownString.baseUri = Uri.parse(ProcedureMetaDataSource.DOCS_BASE_URI);
        
        return new Hover(markdownString, wordRange);
    }
}