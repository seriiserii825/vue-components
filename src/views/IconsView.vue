<script setup>
import SectionHeader from "../components/globals/SectionHeader.vue";
import IconsViewItem from "../components/ui/icons/IconsViewItem.vue";</script>
<template>
  <div class='icons-view'>
    <SectionHeader title="Icons"/>
    <div class="icons-view__wrap">
      <IconsViewItem className="fa-cart-shopping"/>
      <IconsViewItem className="fa-circle-xmark"/>
      <IconsViewItem className="fa-envelope"/>
      <IconsViewItem className="fa-house"/>
      <IconsViewItem className="fa-magnifying-glass-plus"/>
      <IconsViewItem className="fa-pen-to-square"/>
      <IconsViewItem className="fa-trash-can"/>
      <IconsViewItem className="fa-user"/>
      <IconsViewItem className="fa-user-secret"/>
      <IconsViewItem className="fa-angle-up"/>
      <IconsViewItem className="fa-angle-down"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icons-view__wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 2rem;
}
</style>