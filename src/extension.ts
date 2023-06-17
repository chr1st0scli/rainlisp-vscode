// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from 'child_process';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "rainlisp-vscode" is now active!');
	vscode.window.showInformationMessage('Install RainLispConsole and hit Ctrl + Enter (cmd+9 for Mac) to evaluate code.');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rainlisp-vscode.evaluate', () => {
		// The code you place here will be executed every time your command is executed

		let outputChannel = vscode.window.createOutputChannel("RainLisp Output", "rainlisp");

		// Save the current file first.
		vscode.window.activeTextEditor?.document.save().then(saved => {
			let fileName = vscode.window.activeTextEditor?.document.fileName;

			if (!saved) {
				vscode.window.showErrorMessage("File could not be saved: " + fileName);
				return;
			}

			// Send the file to be evaluated by RainLispConsole.
			exec("RainLispConsole.exe -f " + fileName, 
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
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
