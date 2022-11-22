<template>
  <div id="addSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Delete Youtube Video</div>
    <div class="bg-red-500 w-full h-1 mb-4"></div>

    <div
      class="bg-white rounded px=8 pt-6 pb-8"
      v-for="video in videoStore.videos"
      :key="video.id"
    >
      <div class="flex flex-wrap">
        <div class="w-3/4 mr-auto mt-2 text-lg p-1 text-gray-900">
          {{ video.title }}
        </div>
        <div class="w-1/4 ml-auto p-1">
          <button
            @click="deleteVideos(video.user_id, video.id)"
            class="
              float-right
              bg-transparent
              hover:bg-red-500
              text-gray-900
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-red-500
              hover:border-transparent
              rounded
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { videosService } from "@/services/videosService";
import { onMounted } from "vue";
import router from "@/router";
import { useVideoStore } from "@/stores/videoStore";
import { useRoute } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const route = useRoute();
const videoStore = useVideoStore();
onMounted(() => {
  videoStore.fetchVideosByUserId(route.params.user_id);
});

const deleteVideos = (userId, videoId) => {
  videosService.deleteVideo(
    userId,
    videoId,
    () => {
      router.push("/account/profile/" + userId);
      toastNotify(
        {
          title: "Success",
          description: "Video deleted successfully",
        },
        "success"
      );
    },
    (error) => {
      console.log(error);
      toastNotify(
        {
          title: "Error",
          description: "Something went wrong",
        },
        "danger"
      );
    }
  );
};

const toastNotify = (
  config = {
    title: "",
    description: "",
  },
  type
) => {
  createToast(config, {
    type: type,
    position: "top-center",
    transition: "bounce",
  });
};
</script>