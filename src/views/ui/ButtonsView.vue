<script setup>
import SectionHeader from '@/components/globals/SectionHeader.vue';
import Button from "@/components/ui/Button.vue";
import {onMounted} from "vue";
import usePrism from "../../hooks/usePrism";

const btn_default = `
      <Button @click="clickHandler">
        <span>Partecipa</span>
      </Button>
`;

const btn_default_auto = `
      <Button @click="clickHandler" :small="true">
        <span>Partecipa</span>
      </Button>
`;

const btn_colored = `
colors from variables css contrast, primary, success, error
      <Button color="error" :small="true">
        <span>Partecipa</span>
      </Button>
`;

const btn_external = `
      <Button external_link="https://google.com" :small="true">
        <span>Google</span>
      </Button>
`;

const btn_router_link = `
      <Button router_link="/" :small="true">
        <span>RouterLink</span>
      </Button>
`;
const btn_outline = `
      <Button :outline="true" :small="true">
        <span>Google</span>
      </Button>
`;
onMounted(() => {
  usePrism();
})
</script>
<template>
  <SectionHeader title="Buttons"/>
  <div class="buttons">
    <div class="buttons__item">
      <div class="buttons__content">
        <h3 class="buttons__title">Default(full width)</h3>
        <Button @click="clickHandler">
          <span>Partecipa</span>
        </Button>
      </div>
      <div class="buttons_code">
        <pre><code class="language-html">{{ btn_default }}</code></pre>
      </div>
    </div>
    <div class="buttons__item">
      <div class="buttons__content">
        <h3 class="buttons__title">Default(width auto)</h3>
        <Button @click="clickHandler" :small="true">
          <span>Partecipa</span>
        </Button>
      </div>
      <div class="buttons_code">
        <pre><code class="language-html">{{ btn_default_auto }}</code></pre>
      </div>
    </div>
    <div class="buttons__item">
      <div class="buttons__content">
        <h3 class="buttons__title">Colored</h3>
        <Button color="error" :small="true">
          <span>Partecipa</span>
        </Button>
      </div>
      <div class="buttons_code">
        <pre><code class="language-html">{{ btn_colored }}</code></pre>
      </div>
    </div>
    <div class="buttons__item">
      <div class="buttons__content">
        <h3 class="buttons__title">External link</h3>
        <Button external_link="https://google.com" :small="true">
          <span>Google</span>
        </Button>
      </div>
      <div class="buttons_code">
        <pre><code class="language-html">{{ btn_external }}</code></pre>
      </div>
    </div>
    <div class="buttons__item">
      <div class="buttons__content">
        <h3 class="buttons__title">Router link</h3>
        <Button router_link="/" :small="true">
          <span>Router link</span>
        </Button>
      </div>
      <div class="buttons_code">
        <pre><code class="language-html">{{ btn_router_link }}</code></pre>
      </div>
    </div>
    <div class="buttons__item">
      <div class="buttons__content">
        <h3 class="buttons__title">Outline</h3>
        <Button :outline="true" :small="true">
          <span>Google</span>
        </Button>
      </div>
      <div class="buttons_code">
        <pre><code class="language-html">{{ btn_outline }}</code></pre>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.buttons {
  &__title {
    margin-bottom: 2rem;
  }
  &__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
  &__content {
    margin-right: 6rem;
    flex: 0 0 50rem;
  }
}
</style>
