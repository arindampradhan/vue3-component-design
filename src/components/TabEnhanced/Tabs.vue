<script setup lang="ts" generic="T">
import { useTabProvider } from './useTabStore';
const { activeContent } = useTabProvider();

</script>

<template>
	<div class="tabs-container">
		<ul class="tabs">
			<slot />
		</ul>
		<div class="tabs-content">
		    <component :is="() => activeContent"/>
		</div>
	</div>
</template>

<style scoped>
.tabs {
	margin: 0;
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
}
</style>
