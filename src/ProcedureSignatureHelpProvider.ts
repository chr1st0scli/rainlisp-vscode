import { CancellationToken, MarkdownString, ParameterInformation, Position, ProviderResult, SignatureHelp, SignatureHelpContext, SignatureHelpProvider, SignatureInformation, TextDocument, Uri } from "vscode";
import { ProcedureMetaDataSource } from "./ProcedureMetaDataSource";

export class ProcedureSignatureHelpProvider implements SignatureHelpProvider {

    private metadataSource: ProcedureMetaDataSource;

    public constructor() {
        this.metadataSource = ProcedureMetaDataSource.getDataSource();
    }

    provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult<SignatureHelp> {

        // This is not optimal but it is designed to offer an acceptably good and useful user experience to the programmer.
        // A more elaborate solution, with multiple procedure signatures and parameter traversal, would require a
        // language server protocol implementation that would take advantage of RainLisp's parser.

        if (context.triggerCharacter == ' ') {
            position = new Position(position.line, position.character - 1);
        }
        const wordRange = document.getWordRangeAtPosition(position, /[^\s\(\)]+/);

        if (!wordRange) {
            if (context.isRetrigger) {
                return context.activeSignatureHelp;
            }
            return null;
        }

        const word = document.getText(wordRange);
        const procedureMetadata = this.metadataSource.getProcedureMetadata(word);

        if (!procedureMetadata) {
            if (context.isRetrigger) {
                return context.activeSignatureHelp;
            }
            return null;
        }

        const markdownString = new MarkdownString(procedureMetadata.documentation);
        markdownString.baseUri = Uri.parse(ProcedureMetaDataSource.DOCS_BASE_URI);
        
        const signatureHelp = new SignatureHelp();
        signatureHelp.signatures = [new SignatureInformation(procedureMetadata.signature, markdownString)];

        return signatureHelp;
    }
}