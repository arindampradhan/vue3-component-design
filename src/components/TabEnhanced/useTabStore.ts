// useTabStore.ts
import { ref } from 'vue'
import type { Slot } from 'vue';
import { createInjectionState } from '@vueuse/shared'

export interface Tab {
	id?: TabId; 
	content: TabContent,
	label: string,
	active: boolean,
}

export type TabId = string | null | undefined;

export type TabContent = Slot | null;

const [useTabProvider, useTabStore] = createInjectionState(() => {
	// state
	const activeTab = ref<TabId>(null);
	const tabs = ref<Tab[]>([]);
	const activeContent = ref<TabContent>(null);
	let isActiveSet = false;

	const setActiveTab = (index: TabId): void => { 
		activeTab.value = index;
		activeContent.value = tabs.value.find((tab: Tab) => tab.id === index)?.content || null;
	}

	const addTab = (tab: Tab): void => { 
		tabs.value.push(tab);
		if (tab.active) {
			setActiveTab(tab.id);
			isActiveSet = true;
		} else if (!isActiveSet) {
			setActiveTab(tab.id);
			isActiveSet = true;
		}
	}

	const doesTabExist = (tabId: TabId): boolean => { 
		return tabs.value.some((tab: Tab) => tab.id === tabId);
	}

	const removeTab = (tabId: TabId): void => { 
		const index = tabs.value.findIndex((tab: Tab) => tab.id === tabId);
		tabs.value.splice(index, 1);
	}
	
	return {
		activeContent,
		activeTab,
		setActiveTab,
		addTab,
		removeTab,
		doesTabExist,
	};
})

export { useTabProvider, useTabStore }
