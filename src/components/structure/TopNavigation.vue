<template>
    <div class="w-full px-4 relative bg-black z-20 text-white-200">
        <div class="container mx-auto max-w-4xl h-16 flex justify-between text-xs md:text-sm">
            <div class="h-full flex items-center">
                <router-link class="flex justify-center items-center" to="/">
                    <div class="text-white text-2xl"><strong>MSN</strong></div>
                </router-link>
            </div>
            <div class="h-full flex items-center">
                <FullScreenModal />
            </div>
        </div>
    </div>
</template>

<script setup>
    import FullScreenModal from './FullScreenModal.vue';
</script>