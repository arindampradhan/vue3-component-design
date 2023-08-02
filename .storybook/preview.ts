import { Preview } from "@storybook/vue3";
import zeta from './zetaTheme';

const preview: Preview = {
	parameters: {
		docs: {
			theme: zeta,
		},
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		html: {
			prettier: {
				tabWidth: 2,
				useTabs: true,
				htmlWhitespaceSensitivity: "strict",
			},
			highlighter: {
				showLineNumbers: true, // default: false
				wrapLines: false, // default: true
			},
		},
	}
};

export default preview;