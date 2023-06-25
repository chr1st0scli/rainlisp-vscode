import { CancellationToken, MarkdownString, ParameterInformation, Position, ProviderResult, SignatureHelp, SignatureHelpContext, SignatureHelpProvider, SignatureInformation, TextDocument, Uri } from "vscode";
import { ProcedureMetaDataSource } from "./ProcedureMetaDataSource";

export class ProcedureSignatureHelpProvider implements SignatureHelpProvider {

    private lastSignatureHelp: SignatureHelp | undefined = undefined;

    provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult<SignatureHelp> {

        if (context.isRetrigger && this.lastSignatureHelp) {

            if (context.triggerCharacter?.match(/\s/)) {
                this.lastSignatureHelp.activeParameter++;
            }

            return this.lastSignatureHelp;
        } else {

            this.lastSignatureHelp = undefined;

            if (context.triggerCharacter?.match(/\s/)) {
                position = new Position(position.line, position.character - 1);
            }
            const wordRange = document.getWordRangeAtPosition(position, /[^\s\(\)]+/);

            if (!wordRange) {
                return;
            }
    
            const word = document.getText(wordRange);
            const metadataSource = ProcedureMetaDataSource.getDataSource();
            const procedureMetadata = metadataSource.getProcedureMetadata(word);

            if (!procedureMetadata) {
                return null;
            }

            const markdownString = new MarkdownString(procedureMetadata.documentation);
            //markdownString.appendCodeblock(procedureMetadata.signature);
            //markdownString.appendMarkdown(procedureMetadata.documentation);
            markdownString.baseUri = Uri.parse(ProcedureMetaDataSource.DOCS_BASE_URI);
            
            const signatureInfo = new SignatureInformation(procedureMetadata.signature, markdownString);
            
            signatureInfo.parameters = [
                new ParameterInformation('datetime', '*datetime* to add days to.'),
                new ParameterInformation('num', '*num* is the whole and fractional number of days to add, which can be positive or negative.'),
            ];
    
            const signatureHelp = new SignatureHelp();
            signatureHelp.signatures = [signatureInfo];
            signatureHelp.activeSignature = 0;
            signatureHelp.activeParameter = 0;

            this.lastSignatureHelp = signatureHelp;

            return signatureHelp;
        }
    }
}