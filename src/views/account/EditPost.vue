<template>
    <div  v-for="userPost in postStore.userPost" :key="userPost.id">

    <div id="addSong" class="container mx-auto max-w-4xl pt-20 px-6">
      <div class="text-gray-900 text-xl">Edit Post</div>
      <div class="bg-green-500 w-full h-1 mb-4"></div>
      <CropperModal
        v-if="showModal"
        :minAspectRatioProp="{ width: 8, height: 8 }"
        :maxAspectRatioProp="{ width: 8, height: 8 }"
        @croppedImageData="setCroppedImageData"
        @showModal="showModal = false"
      />
      <TextInput
        class="mb-6"
        label="Title"
        :placeholder="userPost.title"
        v-model:input="post.title"
        input-type="text"
        :error="error"
      />
      
      <div class="flex flex-wrap mt-4 mb-6">
        <div class="w-full md:w-1/2">
          <DisplayCropperButton
            btn-text="Add Post Image"
            label="Post Image"
            @showModal="showModal = true"
          />
        </div>
      </div>
      <div class="flex flex-wrap mt-4 mb-6">
        <div class="w-full md:w-1/2">
          <CropperImage label="Cropped Image" v-if="!post.image" :image="userPost.image" />
          <CropperImage v-if="post.image" label="Cropped Image" :image="post.image" />
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <TextArea 
          label="Description"
          :placeholder="userPost.description"
          v-model:description="post.description"
          :error="error"
        />
      </div>
      
    </div>
    <div class="flex flex-wrap my-4 px-6">
      <div class="w-full">
        <SubmitFormButton @click="editPosts(route.params.user_id, route.params.post_id, post)" btn-text="Edit Post" />
      </div>
    </div>
</div>

  </template>
    
    <script setup>
  import { onMounted, reactive, ref } from "vue";
  import TextInput from "@/components/global/TextInput.vue";
  import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
  import DisplayCropperButton from "@/components/global/DisplayCropperButton.vue";
  import CropperModal from "@/components/global/CropperModal.vue";
  import TextArea from "@/components/global/TextArea.vue";
  import CropperImage from "@/components/global/CropperImage.vue";
  import { createToast } from "mosha-vue-toastify";
  import "mosha-vue-toastify/dist/style.css";
  import { postsService } from "@/services/postsService";
  import { useRoute } from "vue-router";
  import router from "@/router";
  import { usePostStore } from "@/stores/postStore";
  
  const error = ref(null);
  const route = useRoute() 
  const postStore = usePostStore()
  onMounted(async () => {
    await postStore.fetchPostsByPostId(route.params.user_id, route.params.post_id)
  })

  let post = reactive({
      title: "",
      image: "",
      description: "",
      user_id: route.params.user_id,
  })
  
  let showModal = ref(false);
  
  const setCroppedImageData = (data) => {
    post.image = data.imageUrl;
  };
  
  const editPosts = (userId, postId, post) => {
      postsService.editPost(userId, postId, post, () => {
          router.push('/account/profile/' + route.params.user_id)
          toastNotify({
              title: "Post edited",
              description: "Post edited successfully"
          }, "success")
      }, (err) => {
          error.value = err
          console.log('error', err)
          toastNotify({
              title: "Error",
              description: "Something went wrong"
          }, "danger")
      })
  }
  
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