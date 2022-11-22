<template>
    <div class="">
        <div class="mx-auto py-4">
            <div class="flex flex-wrap font-bold text-gray-100">
                <div class="text-gray-900 text-xl"> Songs </div>
                <div class="bg-green-500 w-full h-1"></div>

                <div class="w-full mt-4">
                    <RouterLinkButton 
                        class="hover:bg-red-500 border-red-500 ml-2"
                        btn-text="Delete Song"
                        color="red"
                        :url="'/account/' + route.params.user_id + '/delete-song'"
                    />
                    <RouterLinkButton 
                        btn-text="Add Song"
                        color="green"
                        :url="'/account/' + route.params.user_id + '/add-song'"
                    />
                </div>
            </div>
        </div>

        <div class="pb-4">
            <SongPlayer />
        </div>
    </div>
</template>

<script setup>
    import SongPlayer from './SongPlayer.vue';
    import RouterLinkButton from '../../global/RouterLinkButton.vue';
    import { useRoute } from "vue-router"

    const route = useRoute()
</script>