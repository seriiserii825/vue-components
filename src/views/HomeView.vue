<script setup lang="ts">
import { ref } from 'vue'
import InputComplex from '@/components/ui/InputComplex.vue'
const vat = ref('')
const iva_is_valid = ref(false)
function vatClick() {
  console.log('click')
}
</script>
<template>
  <main>
    <div class="container">
      <InputComplex
        v-model:value="vat"
        button_text="Verifica"
        @emit_click="vatClick"
        :count="11"
        :is_valid="iva_is_valid"
        :errors="[]"
      />
    </div>
  </main>
</template>
