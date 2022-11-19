<template>
  <div class="bg-green-500 rounded">
    <div id="aplayer"></div>
  </div>
</template>

<script setup>
    import { onMounted } from "vue";
    import { songsService } from "@/services/songsService";
    import APlayer from "aplayer";
    import 'aplayer/dist/APlayer.min.css';
    import { useRoute } from 'vue-router'

    onMounted(() => {
        getSongsByUser();
        thePlayer();
    })
    
    const route = useRoute()
    let songsList = []
    const getSongsByUser = () => {
        songsService.SongsByUserId(route.params.user_id, (data) => {
           let newSongs = data.data.songs.map((song) => {
                return {
                    name: song.title,
                    artist: data.data.artist_name,
                    url: process.env.VUE_APP_URL + '/storage/songs/' + song.user_id + '/' + song.namefile
                }
            })

            for (let i = 0; i < newSongs.length; i++) {
                songsList.push(newSongs[i])
            }

            thePlayer()
        })
    }
    const thePlayer = () => {
        new APlayer({
            container: document.getElementById('aplayer'),
            audio: songsList
        })
    }
</script>