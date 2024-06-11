<script setup>
	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
	});
</script>
<template>
	<h2 class="section-header">{{ title }}</h2>
</template>
<style lang="scss" scoped>
.section-header {
  margin-bottom: 3rem;
  border-bottom: 1px solid #ccc;
}
</style>
