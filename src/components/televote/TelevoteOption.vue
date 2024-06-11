<script setup>
import {ref} from "vue";
const emits = defineEmits(['emit_delete', 'emit_check', 'emit_change']);
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  is_correct: {
    type: Boolean,
    required: true
  },
});
const title = ref('');
function onDelete(){
  emits('emit_delete', props.id);
}
function onCheck(){
  emits('emit_check', props.id);
}
function titleChange(){
  console.log(title.value, 'title.value')
  emits('emit_change', {id: props.id, answer: title.value});
}
</script>
<template>
  <div class='televote-option'>
    <input @change="titleChange" type="text" v-model="title">
    <div
        @click="onCheck"
        class="televote-option__check"
        :class="{'active': is_correct}"
    ></div>
    <div @click="onDelete" class="televote-option__delete">
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="17" height="17" rx="8.5" fill="#FF5A5A"/>
        <path d="M4.5 8.5L12.5 8.5" stroke="white" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>
<style lang="scss">
.televote-option {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
  padding: 0 1.6rem;
  width: 100%;
  height: 5.1rem;
  font-size: 1.4rem;
  text-indent: 3.2rem;
  background: #E6FFFA;
  border: none;
  border-bottom: 1px solid #D1F4EE;
  border-radius: 16px;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
    text-indent: 3.2rem;
    color: #464F69;
    background: transparent;
    border: none;
    outline: none;
  }
  &__delete {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 2rem;
    height: 2rem;
    cursor: pointer;
  }
  &__check {
    position: relative;
    margin-left: auto;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    border: 1px solid #65B244;
    border-radius: 4px;
    cursor: pointer;
    &.active {
      &::after {
        opacity: 1;
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 12px;
      height: 12px;
      background: #65B244;
      border-radius: 2px;
      opacity: 0;
      transition: all .4s;
    }
  }

}
</style>