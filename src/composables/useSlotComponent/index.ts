import { getCurrentInstance } from 'vue';

export default function useSlotComponent() {
	const vm = getCurrentInstance();

	// Get the component to render from the named slot
	function getSlotComponent() {
		const defaultSlot = vm?.slots?.default?.();
		const customSlot = vm?.slots?.custom?.();

		// Use the custom component if provided, otherwise use the default content
		return customSlot || defaultSlot;
	}

	return {
		getSlotComponent,
	};
}
