<template>
  <div id="addSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Delete Song</div>
    <div class="bg-red-500 w-full h-1 mb-4"></div>

    <div
      class="bg-white rounded px=8 pt-6 pb-8"
      v-for="song in songs"
      :key="song.id"
    >
      <div class="flex flex-wrap">
        <div class="w-3/4 mr-auto mt-2 text-lg p-1 text-gray-900">
          {{ song.title }}
        </div>
        <div class="w-1/4 ml-auto p-1">
          <button
            @click="deleteSongs(song.user_id, song.id)"
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
import { songsService } from "@/services/songsService";
import { useSongStore } from "@/stores/songStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import router from "@/router";

const songs = ref([]);
const songStore = useSongStore();
const route = useRoute();

onMounted(async () => {
  await songStore.fetchSongsByUserId(route.params.user_id);
  getSongsByUser();
});

let newSongs = [];
const getSongsByUser = () => {
  songStore.songs.songs.map((song) => {
    newSongs.push(song);
  });
  songs.value = newSongs;
};

const deleteSongs = (userId, songId) => {
  songsService.deleteSong(
    userId,
    songId,
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