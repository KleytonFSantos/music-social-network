<template>
  <div class="bg-green-500 rounded">
    <div id="aplayer"></div>
  </div>
</template>

<script setup>
    import { onMounted } from "vue";
    import { useSongStore } from "@/stores/songStore";
    import APlayer from "aplayer";
    import 'aplayer/dist/APlayer.min.css';
    import { useRoute } from 'vue-router'

    const songStore = useSongStore()
    const route = useRoute()

    onMounted(async () => {
        await songStore.fetchSongsByUserId(route.params.user_id)
        getSongsByUser();
    })
    
    let songsList = []
    const getSongsByUser = () => {
           let newSongs = songStore.songs.songs.map((song) => {
                return {
                    name: song.title,
                    artist: songStore.songs.artist_name,
                    url: process.env.VUE_APP_URL + '/storage/songs/' + song.user_id + '/' + song.namefile
                }
            })

            for (let i = 0; i < newSongs.length; i++) {
                songsList.push(newSongs[i])
            }

            thePlayer()
        }
    
    const thePlayer = () => {
        new APlayer({
            container: document.getElementById('aplayer'),
            audio: songsList
        })
    }
</script>