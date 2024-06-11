<script setup>
import Preloader from "@/components/ui/Preloader.vue";
import { loading_statuses } from "../../utilities/loading-status";
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  error_message: {
    type: String,
    required: false,
    default: "Error on loading...",
  },
});
</script>
<template>
  <div class="content-container">
    <slot v-if="status === loading_statuses.loading" name="loading">
      <Preloader />
    </slot>
    <slot v-else-if="status === loading_statuses.empty" name="empty">
      <p>No data to view...</p>
    </slot>
    <slot v-else-if="status === loading_statuses.error" name="error">
      <p :style="{'color': 'var(--error)', 'font-weight': 'bold'}">{{ error_message }}</p>
    </slot>
    <slot v-else-if="status === loading_statuses.ready" name="content"></slot>
  </div>
</template>