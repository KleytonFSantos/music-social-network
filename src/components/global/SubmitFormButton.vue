<template>
  <button
    class="
      float-right
      mt-2
      bg-green-500
      hover:bg-green-700
      font-bold
      text-white
      px-4
      py-3
    "
    @click="$emit('submit', true)"
  >
    {{ btnText }}
  </button>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  btnText: String,
});

const { btnText } = toRefs(props);
</script>