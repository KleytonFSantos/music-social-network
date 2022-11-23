<template>
  <div>
    <TopNavigation />
    <div class="w-full h-full max-h-screen flex flex-row">
      <SidebarSection />
      <FeedSection />
    </div>
  </div>
</template>
  
  <script setup>
  import TopNavigation from "../components/structure/TopNavigation.vue";
  import SidebarSection from "@/components/partials/feed/SidebarSection.vue"
  import FeedSection from "@/components/partials/feed/FeedSection.vue"





</script>
  