<script setup lang="ts" generic="T">
import {  inject, useSlots, ref	 } from "vue";
import { tabSymbol, uniqueId } from "./injectionSymbols";

interface TabItemProps {
	label: string;
	active?: boolean;
}

const { active }  = defineProps<TabItemProps>();

const tabs: any = inject(tabSymbol);
const uid = ref(uniqueId('tab-'));
const slots  = useSlots();

const handleClick = () => {
	tabs.activeTab = uid;
	const children = (slots as any)?.default();
	tabs.activeSlot = children;
};

</script>
<template>
  <li
    :class="{
      'is-active': tabs?.activeTab === uid || active,
      'tab-item': true,
    }"
    @click="handleClick()"
  >
    {{ label }}
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
