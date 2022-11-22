import axios from 'axios'
import { ref } from "vue";
import { defineStore } from 'pinia'

const baseUrl = process.env.VUE_APP_API_URL

export const useSongStore = defineStore('song', () => {
        const songs =  ref(null)
        const fetchSongsByUserId = async ( userId: number ) => {
            const token = localStorage.getItem('token');

            const config = {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }
            const res = await axios.get(`${baseUrl}/get-songs/${userId}`, config)
            
            songs.value = res.data
        }

        return { songs, fetchSongsByUserId }
})