<template>
  <div class="lg:max-w-xs md:w-1/3 lg:w-full w-1/4 lg:px-6 h-full top-0 sticky">
    <div class="lg:text-xl text-zinc-900 py-6">
      <div class="py-6 flex flex-col mt-12">
        <RouterLinkSidebar
          btnText="Home"
          link="/feed"
          title="Home"
          :icon="'fa-solid fa-home'"
        />
        <RouterLinkSidebar
          btnText="Profile"
          :link="'/account/profile/' + useStore.user_id"
         :icon="'fa fa-user'"
        />
      </div>
    </div>
    <RouterLinkButton
      color="green"
      btnText="Add Post"
      title="Profile"
      class="float-left ml-4 md:p-3 p-1"
      :url="'/account/' + useStore.user_id + '/create-post'"
    />
  </div>
</template>
<script setup>
import RouterLinkSidebar from "@/components/global/RouterLinkSidebar.vue";
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "@vue/runtime-core";

const useStore = useUserStore();
onMounted(() => {
  useStore.fetchUser();
});
</script>