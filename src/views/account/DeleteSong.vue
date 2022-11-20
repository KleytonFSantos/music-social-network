<template>
  <div id="addSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Delete Song</div>
    <div class="bg-red-500 w-full h-1 mb-4"></div>

    <div class="bg-white rounded px=8 pt-6 pb-8" v-for="song in songs" :key="song.id">
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
import { authService } from "@/services/authService";
import { onMounted, ref } from "vue";
import router from "@/router";

const user_id = ref(null);
const songs = ref([]);
onMounted(() => {
  getUserId();
});

const getUserId = async () => {
  await authService.getUser(
    (data) => {
      user_id.value = data.user_id;
      showSongs(user_id.value);
    },
    (err) => {
      console.log(err);
    }
  );
};

const showSongs = async (userId) => {
  await songsService.SongsByUserId(userId, (data) => {
      songs.value = data.data.songs;
  });
};

const deleteSongs = (userId, songId) => {
  songsService.deleteSong(
    userId, 
    songId, 
    () => {
      router.push('/account/profile/' + userId)
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>