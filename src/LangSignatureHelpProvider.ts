import { CancellationToken, MarkdownString, ParameterInformation, Position, ProviderResult, SignatureHelp, SignatureHelpContext, SignatureHelpProvider, SignatureInformation, TextDocument, Uri } from "vscode";
import { LangMetaDataSource } from "./LangMetaDataSource";

export class LangSignatureHelpProvider implements SignatureHelpProvider {

    public static readonly SPACE_TRIGGER_CHAR = ' ';
    public static readonly NEWLINE_TRIGGER_CHAR = '\n';

    private metadataSource: LangMetaDataSource;

    public constructor() {
        this.metadataSource = LangMetaDataSource.getDataSource();
    }

    provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult<SignatureHelp> {

        // This is not optimal but it is designed to offer an acceptably good and useful user experience to the programmer.
        // A more elaborate solution, with multiple procedure signatures and parameter traversal, would require a
        // language server protocol implementation that would take advantage of RainLisp's parser.

        if (context.triggerCharacter == LangSignatureHelpProvider.SPACE_TRIGGER_CHAR) {
            position = new Position(position.line, position.character - 1);
        } else if (context.triggerCharacter == LangSignatureHelpProvider.NEWLINE_TRIGGER_CHAR) {
            position = document.lineAt(position.line - 1).range.end;
        }
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            if (context.isRetrigger) {
                return context.activeSignatureHelp;
            }
            return null;
        }

        const word = document.getText(wordRange);
        const metadata = this.metadataSource.getMetadataFor(word);

        if (!metadata) {
            if (context.isRetrigger) {
                return context.activeSignatureHelp;
            }
            return null;
        }

        const markdownString = new MarkdownString(metadata.documentation);
        markdownString.baseUri = Uri.parse(LangMetaDataSource.DOCS_BASE_URI);
        
        const signatureHelp = new SignatureHelp();
        signatureHelp.signatures = [new SignatureInformation(metadata.signature, markdownString)];

        return signatureHelp;
    }
}