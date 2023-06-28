// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProcedureCompletionItemProvider } from './ProcedureCompletionItemProvider'
import { ProcedureSignatureHelpProvider } from './ProcedureSignatureHelpProvider';
import { ProcedureHoverProvider } from './ProcedureHoverProvider';
import { Evaluator } from './Evaluator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const langId = 'rainlisp';

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(langId, new ProcedureCompletionItemProvider(), ProcedureCompletionItemProvider.TRIGGER_CHAR));
	context.subscriptions.push(vscode.languages.registerHoverProvider(langId, new ProcedureHoverProvider()));
	context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(langId, new ProcedureSignatureHelpProvider(), ProcedureSignatureHelpProvider.SPACE_TRIGGER_CHAR, ProcedureSignatureHelpProvider.NEWLINE_TRIGGER_CHAR));

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "rainlisp-vscode" is now active!');
	vscode.window.showInformationMessage('Install RainLispConsole and hit Ctrl + F12 (cmd + F12 for Mac) to evaluate code.');

	let evaluator = new Evaluator(langId);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rainlisp-vscode.evaluate', () => {
		// The code you place here will be executed every time your command is executed
		evaluator.EvaluateCurrentFile();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
