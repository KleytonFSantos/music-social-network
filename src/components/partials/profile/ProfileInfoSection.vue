<template>
  <div
    :v-if="songsNumber"
    class="
      w-full
      sm:w-1/2
      font-bold
      text-gray-100
      mt-4
      rounded
      text-center
      bg-green-500
      p-2
      py-1
    "
  >
    {{
      songsNumber > 0 ? 
      songsNumber > 1 ? 
      songsNumber + ' Songs' : 
      songsNumber + ' Song' : 
      ''
    }}
  </div>
</template>
<script setup>
 import  { defineProps, toRefs }  from 'vue';

  const props = defineProps({
      songsNumber: Number,
  });

  const { songsNumber } = toRefs(props);

</script>