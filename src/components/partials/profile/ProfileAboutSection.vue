<template>
  <div class="py-2">
    <p class="text-gray-900 text-lg">
      <b>About me</b>
    </p>
    <p class="text-md md:text-lg text-gray-600 leading-normal">
     {{ aboutText}}
    </p>
  </div>
</template>
<script setup>
 import  { computed, defineProps, toRefs }  from 'vue';

  const props = defineProps({
      aboutText: String,
  });

  const { aboutText } = toRefs(props);

</script>
