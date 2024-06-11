<script setup="">
const events = defineEmits(['button_clicked']);
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  download_text: {
    type: String,
    required: false
  },
  download_file: {
    type: String,
    required: false
  },
  button_text: {
    type: String,
    required: false
  },
  small: {
    type: Boolean,
    required: false
  },
  list_icon: {
    type: Boolean,
    required: false
  },
});

function buttonClicked() {
  events('button_clicked');
}
</script>
<template>
  <section class='block'>
    <header class="block__header" :class="{'block__header--small': small}">
      <slot name="header"/>
    </header>
    <div class="block__body">
      <slot/>
    </div>
  </section>
</template>
<style lang="scss">
.block {
  margin-bottom: 1.6rem;
  background: #fff;
  box-shadow: 0 0.4rem 12.8rem rgba(#101D1A, 0.2);
  border-radius: 1.6rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3.2rem;
    border-bottom: 1px solid #D1F4EE;
    &--small {
      padding: 1.6rem 1.6rem 1.6rem 3.2rem;
    }
  }
  &__title {
    margin-bottom: 1.6rem;
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__subtitle {
    font-size: 2rem;
    font-weight: 600;
    color: #464F69;
  }
  &__text {
    font-size: 2rem;
  }
  &__btn {
    display: flex;
    align-items: center;
    padding: 1.6rem;
    font-weight: 600;
    color: #464F69;
    background: #D1F4EE;
    border-radius: 1.6rem;
    border: none;
    transition: all .4s;
    cursor: pointer;
    &:hover {
      background: darken(#D1F4EE, 10%);
    }
    span {
      display: inline-block;
    }
    svg {
      margin-right: 1rem;
    }
  }
  &__body {
    padding: 3.2rem;
  }
}
</style>