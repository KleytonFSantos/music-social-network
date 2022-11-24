import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const baseUrl = process.env.VUE_APP_API_URL;

export const useFeedStore = defineStore("feed", () => {
  const feed = ref(null);
  const last_page = ref(null);

  const fetchFeed = async (page?: number) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${baseUrl}/posts?page=${page}`, config);
    feed.value = res.data.data;
    last_page.value = res.data.meta.last_page;
  };

  return { feed, last_page, fetchFeed };
});