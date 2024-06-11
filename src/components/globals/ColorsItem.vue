<script setup>
	const props = defineProps({
		color: {
			type: String,
			required: true,
		},
	});
</script>
<template>
	<li class="colors-item">
		<span
			class="colors-item__value"
			:style="{ background: `var(--${color})` }"
		></span>
		<span class="colors-item__title">{{ color }}</span>
	</li>
</template>
<style lang="scss" scoped>
	.colors-item {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
    cursor: pointer;
		&__value {
			margin-right: 1rem;
			width: 2rem;
			height: 2rem;
		}
	}
</style>
