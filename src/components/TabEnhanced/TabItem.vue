<script setup lang="ts" generic="T">
import { computed, onMounted, onUnmounted,  useSlots } from 'vue';
import {useTabStore} from './useTabStore';
import { uniqueId } from 'lodash';

export interface TabItemProps {
	label: string;
	active?: boolean;
}

const { label, active } = defineProps<TabItemProps>();
const slots = useSlots()
const tabId = uniqueId('tab-');

const { 
	activeTab,
	setActiveTab,
	addTab,
	removeTab,
	doesTabExist
 } : any = useTabStore()

onMounted(() => {
	addTab({ label, content: slots && (slots as any)?.default(), id: tabId, active: !!active })
})

onUnmounted(() => {
	removeTab(tabId)
})

const isTabActive = computed(() => activeTab.value === tabId)
const isTabRemoved = computed(() => {
	return doesTabExist(tabId)
})

</script>
<template>
  <li
		v-if="isTabRemoved"
    :class="{
      'is-active': isTabActive,
      'tab-item': true,
    }"
    @click="setActiveTab(tabId)"
  >
    {{ label }}
		&nbsp;<button @click.prevent="removeTab(tabId)">-</button>
  </li>
</template>
<style scoped>
.tab-item {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  height: 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  &:hover {
    border-bottom: 1px solid blue;
  }

  &.is-active {
    border-bottom: 2px solid blue;
  }
}
</style>
