import { Plugin } from 'vite';

export default function themePlugin({
	target,
	entry,
	theme
}: {
	target: string,
	entry: string,
	theme: string
}): Plugin {
	return {
		name: 'vite-gds-theme-plugin',
		buildStart() {
			// transform(entry, theme, target);
			// You can do something with the generated tokens file path, e.g., read and process the JSON data
			// console.log(fs.readJSONSync(filePath));
		},
	};
}
