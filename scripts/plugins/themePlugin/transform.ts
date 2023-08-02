import fs from 'fs-extra';
import path from 'path';

interface TransformResult {
	filePath: string;
	removeTemp: () => void;
}

/**
 * Reads the tokens file and returns the JSON data
 * @param fileTarget target of the tokens file
 * @returns reads the tokens file and returns the JSON data
 */
function getTokens(fileTarget: string): Record<string, any> {
	const filePath = path.resolve(fileTarget)
	if (fs.existsSync(filePath)) {
		return fs.readJSONSync(filePath, { encoding: 'utf-8' });
	} else {
		throw Error(`File path ${filePath} does not exist`)
	}
}

/**
 * They token file is transformed to a format that can be used by style-dictionary
 * @param tokenPath path of the tokens file
 * @param theme type of theme
 * @param target target of the tokens file
 * @returns An object containing the path of the generated tokens file and a function to remove the temporary folder
 */
function transform(tokenPath: string, theme: string, target: string): TransformResult {
	const TEMP_FOLDER_PATH = path.join(__dirname, 'node_modules', '.cache', 'vite-gds-theme-plugin');
	let tokensGroup: Record<string, any> = {};

	const mainTokens = getTokens(tokenPath);
	const themeGlobal = mainTokens[`${theme}-global`];
	const themeAlias = mainTokens[`${theme}-alias`].alias;

	Object.keys(mainTokens).forEach((component) => {
		if (!(component.includes('-global') || component.includes('-alias'))) {
			let compTokens = mainTokens[component];
			compTokens = JSON.parse(JSON.stringify(compTokens).split('alias.').join(''));
			tokensGroup = { ...tokensGroup, ...compTokens };
		}
	});

	tokensGroup = { ...themeGlobal, ...themeAlias, ...tokensGroup };

	if (fs.existsSync(TEMP_FOLDER_PATH)) {
		fs.rmdirSync(TEMP_FOLDER_PATH, { recursive: true });
	}

	fs.mkdirSync(TEMP_FOLDER_PATH);
	fs.writeFileSync(path.join(TEMP_FOLDER_PATH, 'tokens.json'), JSON.stringify(tokensGroup, null, 4), {
		encoding: 'utf-8',
	});

	return {
		filePath: path.join(TEMP_FOLDER_PATH, 'tokens.json'),
		removeTemp: () => {
			if (fs.existsSync(TEMP_FOLDER_PATH)) {
				fs.rmdirSync(TEMP_FOLDER_PATH, { recursive: true });
			}
		},
	};
}

export default transform;