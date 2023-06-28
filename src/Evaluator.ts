import { exec } from 'child_process';
import * as vscode from 'vscode';

export class Evaluator {

    private langId: string;

    public constructor(langId: string) {
        this.langId = langId;
    }

    public EvaluateCurrentFile() {
		let outputChannel = vscode.window.createOutputChannel('RainLisp Output', this.langId);

		// Save the current file first.
		vscode.window.activeTextEditor?.document.save().then(saved => {
			let fileName = vscode.window.activeTextEditor?.document.fileName;

			if (!saved) {
				vscode.window.showErrorMessage('File could not be saved: ' + fileName);
				return;
			}

			// Send the file to be evaluated to RainLispConsole.
			exec('RainLispConsole.exe -f ' + fileName, 
				(error, stdout, stderr) => {

					outputChannel.clear();
					outputChannel.append(stdout);
					
					if (error != null) {
						outputChannel.append(stderr);
						vscode.window.showErrorMessage(stderr);
					}

					outputChannel.show(true);
				});
		});
    }
}