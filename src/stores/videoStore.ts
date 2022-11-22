import axios from 'axios'
import { ref } from "vue";
import { defineStore } from 'pinia'

const baseUrl = process.env.VUE_APP_API_URL

export const useVideoStore = defineStore('video', () => {
        const videos =  ref(null)
        const fetchVideosByUserId = async ( userId: number ) => {
            const token = localStorage.getItem('token');

            const config = {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }
            const res = await axios.get(`${baseUrl}/videos/${userId}`, config)

            videos.value = res.data.videos;
        }

        return { videos, fetchVideosByUserId }
})