<template>
  <div
    class="lg:p-12"
    v-for="{
      id,
      title,
      image,
      description,
      first_name,
      last_name,
      profile_image,
      data,
    } in feedStore.feed"
    :key="id"
  >
    <div
      class="
        flex flex-col
        bg-white
        border
        rounded-lg
        shadow-md
        hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
      "
    >
      <div class="lg:h-16 flex flex-col">
        <div class="p-2 flex">
          <img
            class="w-12 h-12 rounded-full"
            :src="profile_image"
            alt="Rounded avatar"
          />
          <div class="flex flex-col">
            <div class="p-1 ml-2 leading-tight font-semibold capitalize">
              {{ first_name + ' ' + last_name }} 
            </div>
            <small class="ml-4">{{ data }}</small>
          </div>
        </div>
      </div>
      <img
        class="object-cover w-full rounded-t-lg lg:h-96 h-36 md:h-auto"
        :src="image"
        alt=""
      />
      <div
        class="flex flex-col justify-between lg:p-4 md:p-4 p-2 leading-normal"
      >
        <h5
          class="
            lg:mb-2 lg:text-2xl
            md:text-xl
            font-bold
            tracking-tight
            text-zinc-900
            dark:text-white
          "
        >
          {{ title}}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useFeedStore } from "@/stores/feedStore";
import { onMounted } from "@vue/runtime-core";

const feedStore = useFeedStore();

onMounted(async () => {
  await feedStore.fetchFeed()
});

</script>