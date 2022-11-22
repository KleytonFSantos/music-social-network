import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const baseUrl = process.env.VUE_APP_API_URL;

export const usePostStore = defineStore("post", () => {
  const posts = ref(null);
  const userPost = ref(null);
  const fetchPostsByUserId = async (userId: number) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${baseUrl}/posts/${userId}`, config);
    console.log("posts res", res);
    posts.value = res.data.data;
  };

  const fetchPostsByPostId = async (userId: number, postId: number) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${baseUrl}/${userId}/post/${postId}`, config);

    userPost.value = res.data
    console.log('postUser', res, userPost)
  }

  return { userPost, posts, fetchPostsByUserId, fetchPostsByPostId };
});
