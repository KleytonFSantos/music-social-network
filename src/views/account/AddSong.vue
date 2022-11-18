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
import { songsService } from "@/services/songsService"
import router from "@/router";
import { ref } from "vue";


let error = ref(null);
let title = ref(null);
let song = ref(null);

const getUploadedSong = (e) => {
  song.value =  URL.createObjectURL(e.target.files[0]);
}

const addSong = () => {
  songsService.addSongs({
    title: title.value, 
    song: song.value
  }, () => {
      router.push('/account/profile')
    }, () => {
      error.value = "erro no upload";
    })
    console.log(title.value, song.value);
}

</script>