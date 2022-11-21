<template>
  <div id="addSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Add Song</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>
    <TextInput
      class="mb-6"
      label="Title"
      placeholder="cool new song"
      v-model:input="title"
      input-type="text"
      :error="error"
    />
  </div>
  <div class="flex flex-wrap my-4 px-6">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      Select Song
    </label>

    <div class="mb-3 w-full">
      <input
        class="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-400
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-blue-600
          focus:outline-none
        "
        type="file"
        id="song"
        ref="fileInput"
        @change="getUploadedSong"
      />
    </div>
    <div class="w-full">
      <SubmitFormButton @click="addSong" btn-text="Add Song" />
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/global/TextInput.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import { songsService } from "@/services/songsService";
import { authService } from "@/services/authService";
import router from "@/router";
import { ref, onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

onMounted(() => {
  getUserId();
});

let user_id = ref(false);
let error = ref(null);
let title = ref(null);
let song = ref(null);

const getUploadedSong = (e) => {
  song.value = e.target.files[0];
};

const getUserId = () => {
  authService.getUser(
    (data) => {
      user_id.value = data.user_id;
    },
    (err) => {
      console.log(err);
    }
  );
};

const addSong = () => {
  const payload = new FormData();
  payload.append("title", title.value);
  payload.append("song", song.value);
  songsService.addSongs(
    payload,
    () => {
      router.push("/account/profile/" + user_id.value);
      toastNotify(
        {
          title: "Success",
          description: "Song added successfully",
        },
        "success"
      );
    },
    () => {
      error.value = "erro no upload";
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