import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const baseUrl = process.env.VUE_APP_API_URL;

export const useFeedStore = defineStore("feed", () => {
  const feed = ref(null);

  const fetchFeed = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${baseUrl}/posts/`, config);
    console.log("feed res", res);
    feed.value = res.data.data;
  };

  return { feed, fetchFeed };
});