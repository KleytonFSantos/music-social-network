import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const baseUrl = process.env.VUE_APP_API_URL;

export const useUserStore = defineStore("user", () => {
  const user_id = ref(null);
  const user_token = ref();
  const first_name = ref(null);
  const last_name = ref(null);
  const description = ref(null);
  const city = ref(null);
  const state = ref(null);
  const profile_image = ref(null);
  const user_songs = ref(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const res = await axios.get(`${baseUrl}/get-user`, config);
    user_id.value = res.data.user_id;
    user_token.value = token;
    first_name.value = res.data.first_name;
    last_name.value = res.data.last_name;
    description.value = res.data.description;
    city.value = res.data.city;
    state.value = res.data.state;
    profile_image.value = res.data.profile_image;
    user_songs.value = res.data.songs;
  };

  return {
    fetchUser,
    user_id,
    user_token,
    first_name,
    last_name,
    description,
    city,
    state,
    profile_image,
    user_songs,
  };
});
