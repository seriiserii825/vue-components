<script setup>
import {ref} from '@vue/reactivity';
import {useRouter} from "vue-router";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const isVisibleList = ref(true);
const router = useRouter()
const route_path = router.currentRoute.value.path;

// isVisibleList.value = props.items.some((item) => {
//   return item.url === route_path;
// });


function toggleList() {
  isVisibleList.value = !isVisibleList.value;
}
</script>
<template>
  <div class="menu-dropdown">
    <header
        class="menu-dropdown__header prevent-select"
        @click="toggleList"
    >
			<span class="menu-dropdown__icon"><font-awesome-icon :icon="`fa-solid ${icon}`"/></span><span>{{ label }}</span>
    </header>
    <ul v-if="isVisibleList" class="menu-dropdown__list">
      <li v-for="{ title, url } in items" :key="title">
        <router-link :to="url" class="menu-dropdown__link">
          <span>- {{ title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.menu-dropdown {
  padding: 1rem;
  background: var(--dark-bg-darken);
  &__header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__icon {
    margin-right: 1rem;
  }
  &__list {
    margin-top: 1rem;
  }
  li {
    padding: 0.5rem 1rem;
  }
  &__link {
    &.router-link-exact-active {
      color: var(--accent-hover);
    }
  }
}
</style>
