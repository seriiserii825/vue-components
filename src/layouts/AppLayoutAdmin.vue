<script setup>
import MenuDropdown from '@/components/navigation/MenuDropdown.vue';
</script>

<template>
  <main class="app-layout-default-main p-2 bg-amber-50">
    <div class="admin">
      <div class="admin__sidebar">
        <h2 class="admin__title">
          <RouterLink to="/">Home</RouterLink>
        </h2>
        <h2 class="admin__title">
          <RouterLink to="/ui">UI</RouterLink>
        </h2>
        <MenuDropdown
            label="Forms"
            icon="fa-user-secret"
            :items="[
						{ title: 'Icons', url: '/icons' },
						{ title: 'Buttons', url: '/buttons' },
						{ title: 'Checkbox', url: '/checkbox' },
						{ title: 'Radio', url: '/radio' },
						{ title: 'Inut', url: '/input' },
						{ title: 'Select', url: '/select' },
					]"
        />
      </div>
      <div class="admin__main">
        <slot/>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.admin {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  &__sidebar {
    padding: 3rem 2rem;
    width: 16%;
    color: white;
    background: #444;
  }
  &__main {
    flex: 1;
    padding: 3rem 2rem;
    background: #f1f1f1;
  }
  &__title {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #666;
  }
}
</style>
