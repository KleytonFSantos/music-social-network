<template>
    <div class="">
        <div class="mx-auto py-4">
            <div class="flex flex-wrap font-bold text-gray-100">
                <div class="text-gray-900 text-xl"> Youtube Videos </div>
                <div class="bg-green-500 w-full h-1"></div>

                <div class="w-full mt-4">   
                    <RouterLinkButton 
                        class="ml-2"
                        btn-text="Delete Youtube Video"
                        color="red"
                        :url="'/account/' + route.params.user_id + '/delete-youtube-video'"
                    />
                    <RouterLinkButton
                        btn-text="Add Youtube Video"
                        color="green"
                        :url="'/account/' + route.params.user_id + '/add-youtube-video'"
                    />
                </div>
            </div>
        </div>

        <div class="flex flex-wrap mb-4" >
            <div class="my-1 px-1 w-full md:w-1/2 lg:w-1/2" v-for="video in storeVideo.videos" :key="video.id">
                <div class="text-xl text-gray-900">{{ video.title }}</div>
                <iframe class="w-full h-60 mt-2 rounded-md" :src="'https://www.youtube.com/embed/' + video.path" title="Video section with Vue 3 and Tailwind CSS | IFrame | Pt 10" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useVideoStore } from '@/stores/videoStore';
    import { useRoute } from 'vue-router';
    import RouterLinkButton from '@/components/global/RouterLinkButton.vue';
    
    const storeVideo = useVideoStore()
    const route = useRoute()

    onMounted( async () => {
        storeVideo.fetchVideosByUserId(route.params.user_id);
    });
</script>