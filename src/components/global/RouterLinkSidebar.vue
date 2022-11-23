<template>
  <router-link
    class="
      mb-4
      float-left
      bg-transparent
      text-gray-900
      font-light
      py-2
      px-6
      md:py-3
      md:flex
      rounded-md
      hover:bg-zinc-200
      hover:text-green-500
        hover:transition-colors
    "
    :to="link"
  >
    <font-awesome-icon :icon="icon" class="mr-2" />
    <div class="hidden md:visible lg:block hover:block" :title="title">
        {{ btnText }}
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  btnText: String,
  link: String,
  icon: String,
  title: String,
});

const { btnText, link, icon, title } = toRefs(props);
</script>