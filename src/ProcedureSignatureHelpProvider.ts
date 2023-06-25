import { CancellationToken, MarkdownString, ParameterInformation, Position, ProviderResult, SignatureHelp, SignatureHelpContext, SignatureHelpProvider, SignatureInformation, TextDocument, Uri } from "vscode";
import { ProcedureMetaDataSource } from "./ProcedureMetaDataSource";

export class ProcedureSignatureHelpProvider implements SignatureHelpProvider {

    private lastSignatureHelp: SignatureHelp | undefined = undefined;

    provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult<SignatureHelp> {

        console.log('Retrigger: ' + context.isRetrigger);
        console.log('Trigger char: ' + (context.triggerCharacter == " " ? "space" : (context.triggerCharacter == "\n" ? "\n" : (context.triggerCharacter == "\t" ? "\t" : context.triggerCharacter))));

        if (context.triggerCharacter == ' ') {
            position = new Position(position.line, position.character - 1);
        }
        const wordRange = document.getWordRangeAtPosition(position, /[^\s\(\)]+/);

        if (!wordRange) {
            console.log('Not a word range');
            if (context.isRetrigger) {
                return this.lastSignatureHelp;
            }
            return;
        }

        const word = document.getText(wordRange);

        console.log("Word: " + word);

        const metadataSource = ProcedureMetaDataSource.getDataSource();
        const procedureMetadata = metadataSource.getProcedureMetadata(word);

        if (!procedureMetadata) {
            if (context.isRetrigger) {
                return this.lastSignatureHelp;
            }
            return null;
        }

        const markdownString = new MarkdownString(procedureMetadata.documentation);
        markdownString.baseUri = Uri.parse(ProcedureMetaDataSource.DOCS_BASE_URI);
        
        const signatureInfo = new SignatureInformation(procedureMetadata.signature, markdownString);
        const signatureHelp = new SignatureHelp();
        signatureHelp.signatures = [signatureInfo];

        this.lastSignatureHelp = signatureHelp;

        return signatureHelp;
    }
}