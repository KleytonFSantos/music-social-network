import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const baseUrl = process.env.VUE_APP_API_URL;

export const useFeedStore = defineStore("feed", () => {
  const feed = ref(null);
  const loading = ref(false);
  const last_page = ref(null);
  const current_page = ref(null);

  const fetchFeed = async (page?: number) => {
    loading.value = true
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${baseUrl}/posts?page=${page}`, config);
    feed.value = res.data.data;
    if(res.data.data.length > 0) {
      loading.value = false;
    }
    console.log('res', res.data.meta)
    last_page.value = res.data.meta.last_page;
    current_page.value = res.data.meta.current_page;
  };

  return { feed, loading, last_page, current_page, fetchFeed };
});