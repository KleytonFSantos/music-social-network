<template>
  <div class="">
    <div class="mx-auto py-4">
      <div class="flex flex-wrap font-bold text-gray-100">
        <div class="text-gray-900 text-xl">Posts</div>
        <div class="bg-green-500 w-full h-1"></div>

        <div class="w-full mt-4">
          <RouterLinkButton
            class="ml-2"
            btn-text="Create Post"
            color="green"
            :url="'/account/' + route.params.user_id + '/create-post'"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mb-4">
      <div
        class="my-1 px-1 w-full md:w-1/2 lg:w-1/2"
        v-for="post in postStore.posts"
        :key="post.id"
      >
        <div class="rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img class="rounded-t-lg" :src="post.image" :alt="post.title" />
          </a>
          <div class="p-2 md:p-4">
            <div class="text-lg">
              <router-link
                to=""
                class="underline text-blue-500 hover:text-blue-600"
              >
                {{ post.title }}
              </router-link>
            </div>
            <p class="text-gray-dark text-md mt-2">{{ post.description }}</p>
            <div class="mt-2 flex items-center justify-end">
              <router-link
                :to="'/account/' + route.params.user_id +  '/edit-post/' + post.id"
                class="
                  bg-blue-500
                  hover:bg-blue-700
                  text-white text-sm
                  font-bold
                  py-1
                  px-2
                  rounded-full
                  mr-2
                "
              >
                Edit Post
              </router-link>
              <button
                @click="deletePosts(post.user_id, post.id)"
                class="
                  bg-red-500
                  hover:bg-red-700
                  text-white text-sm
                  font-bold
                  py-1
                  px-2
                  rounded-full
                "
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import RouterLinkButton from "../../global/RouterLinkButton.vue";
import { usePostStore } from "@/stores/postStore";
import { postsService } from "@/services/postsService";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { onMounted } from "vue";

const postStore = usePostStore();
const route = useRoute();

onMounted(async () => {
  await postStore.fetchPostsByUserId(route.params.user_id);
});

const deletePosts = async (userId, postId) => {
  await postsService.deletePost(
    userId,
    postId,
    async () => {
      await postStore.fetchPostsByUserId(route.params.user_id);
      toastNotify(
        {
          title: "Post deleted",
          description: "Post successfully deleted",
        },
        "success"
      );
    },
    () => {
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
console.log("posts", postStore.posts);
</script>