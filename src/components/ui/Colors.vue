<script setup>
import SectionHeader from '@/components/globals/SectionHeader.vue';
import ColorsItem from '@/components/globals/ColorsItem.vue';

const code = `
:root {
	--accent: #3c8dbc;
	--accent-hover: #a86078;
	--contrast: #f16529;
	--contrast-hover: #fa7134;
	--dark-bg: #444;
	--dark-bg-darken: #333;
	--primary: #0d7296;
	--primary-hover: #0f8dbb;
	--success: #139b2d;
	--success-hover: #19c73a;
	--error: #980404;
}
`;

</script>

<template>
  <div class="colors">
    <SectionHeader title="Colors"/>
    <ul class="colors__list">
      <ColorsItem color="accent"/>
      <ColorsItem color="accent-hover"/>
      <ColorsItem color="contrast"/>
      <ColorsItem color="contrast-hover"/>
      <ColorsItem color="dark-bg"/>
      <ColorsItem color="dark-bg-darken"/>
      <ColorsItem color="primary"/>
      <ColorsItem color="primary-hover"/>
      <ColorsItem color="success"/>
      <ColorsItem color="success-hover"/>
    </ul>
  </div>
</template>
