import type { Meta, StoryObj } from '@storybook/vue3';

import ComponentDev from './ComponentDev.vue';

const meta = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Development/ComponentDev',
	component: ComponentDev,
	render: (args: any) => ({
		components: { ComponentDev },
		setup() {
			return { args };
		},
		template: '<ComponentDev v-bind="args" />',
	}),
	tags: ['autodocs'],
} satisfies Meta<typeof ComponentDev>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		msg: 'Hello World',
		class: 'bg-red-500',
		key: 2
	},
};
