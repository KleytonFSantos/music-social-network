<template>
    <div id="addSong" class="container mx-auto max-w-4xl pt-20 px-6">
      <div class="text-gray-900 text-xl">Add Youtube Video</div>
      <div class="bg-green-500 w-full h-1 mb-4"></div>
      <TextInput
        class="mb-6"
        label="Title"
        placeholder="cool new video"
        v-model:input="video.title"
        input-type="text"
        :error="error"
      />
    </div>
    <div class="flex flex-wrap my-4 px-6">
      <div class="mb-3 w-full">
        <TextInput
        class="mb-6"
        label="Add Video"
        placeholder="qVEAdTvnRvE"
        v-model:input="video.video"
        input-type="text"
        :error="error"
      />
      </div>
      <div class="w-full">
        <SubmitFormButton @click="addVideo" btn-text="Add Song" />
      </div>
    </div>
  </template>
  
  <script setup>
  import TextInput from "@/components/global/TextInput.vue";
  import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
  import { videosService } from "@/services/videosService";
  import { authService } from "@/services/authService";
  import router from "@/router";
  import { ref, onMounted, reactive } from "vue";
  import { createToast } from "mosha-vue-toastify";
  import "mosha-vue-toastify/dist/style.css";
  
  onMounted(() => {
    getUserId();
  });
  
  let error = ref(null);
  let video = reactive({
    title: "",
    video: "",
    user_id: ""
  })
  
  
  const getUserId = () => {
    authService.getUser(
      (data) => {
        video.user_id = data.user_id;
      },
      (err) => {
        console.log(err);
      }
    );
  };
  
  const addVideo = () => {
    videosService.addVideos(
      video,
      () => {
        router.push("/account/profile/" + video.user_id);
        toastNotify(
          {
            title: "Success",
            description: "Video added successfully",
          },
          "success"
        );
      },
      () => {
        error.value = "error in add a new video";
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