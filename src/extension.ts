import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Command: Jump to Route
    const jumpToRoute = vscode.commands.registerCommand('laravel-route-jumper.jumpToRoute', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const document = editor.document;
        const selection = editor.selection;

        const wordRange = document.getWordRangeAtPosition(
            selection.active,
            /route\(\s*(route:\s*)?['"][^'"]+['"]\s*\)/
        );

        if (!wordRange) {
            vscode.window.showErrorMessage("No route() call found.");
            return;
        }

        const routeCall = document.getText(wordRange);
        const routeNameMatch = routeCall.match(/route\(\s*(?:route:\s*)?['"]([^'"]+)['"]\)/);

        if (!routeNameMatch) {
            vscode.window.showErrorMessage("Could not extract route name.");
            return;
        }

        const routeName = routeNameMatch[1];
        const routeFiles = await vscode.workspace.findFiles('routes/**/*.php');

        for (const file of routeFiles) {
            const doc = await vscode.workspace.openTextDocument(file);
            const text = doc.getText();

            const routeRegex = new RegExp(
                `Route::(get|post|put|delete|patch|any)\\s*\\([^)]*['"]${routeName.replace('.', '\\.')}['"]` +
                `|\\->name\\(['"]${routeName}['"]\\)`,
                'g'
            );

            const match = routeRegex.exec(text);
            if (match) {
                const line = doc.positionAt(match.index).line;
                const range = new vscode.Range(line, 0, line, 0);
                await vscode.window.showTextDocument(doc, { selection: range });
                return;
            }
        }

        vscode.window.showErrorMessage(`Route "${routeName}" not found in route files.`);
    });

    context.subscriptions.push(jumpToRoute);

    // Ctrl+Click: Go to route definition
    const routeDefinitionProvider: vscode.DefinitionProvider = {
        async provideDefinition(document, position, token) {
            const wordRange = document.getWordRangeAtPosition(
                position,
                /route\(\s*(route:\s*)?['"][^'"]+['"]\s*\)/
            );

            if (!wordRange) { return; }

            const routeCall = document.getText(wordRange);
            const routeNameMatch = routeCall.match(/route\(\s*(?:route:\s*)?['"]([^'"]+)['"]\)/);

            if (!routeNameMatch) { return; }

            const routeName = routeNameMatch[1];
            const routeFiles = await vscode.workspace.findFiles('routes/**/*.php');

            for (const file of routeFiles) {
                const doc = await vscode.workspace.openTextDocument(file);
                const text = doc.getText();

                const routeRegex = new RegExp(
                    `Route::(get|post|put|delete|patch|any)\\s*\\([^)]*['"]${routeName.replace('.', '\\.')}['"]` +
                    `|\\->name\\(['"]${routeName}['"]\\)`,
                    'g'
                );

                const match = routeRegex.exec(text);
                if (match) {
                    const matchPos = doc.positionAt(match.index);
                    return new vscode.Location(file, matchPos);
                }
            }

            return null;
        }
    };

    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            { scheme: 'file', language: '*' },
            routeDefinitionProvider
        )
    );
}

export function deactivate() {}
