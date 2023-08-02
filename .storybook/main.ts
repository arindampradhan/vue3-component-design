const isDev = process.env.NODE_ENV === "development";

const devAddons = [
  "@storybook/addon-a11y",
  "@storybook/addon-designs",
  "@storybook/addon-interactions",
];

export default {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		...(isDev ? devAddons : []),
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
    "@whitespace/storybook-addon-html",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
};
