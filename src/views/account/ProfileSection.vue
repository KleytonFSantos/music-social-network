<template>
  <div class="container max-w-4xl mx-auto flex mt-10">
    <div class="w-1/3">
      <img
        v-if="userStore"
        class="w-full rounded-lg h-auto shadow-lg"
        :src="userStore.profile_image 
        ?? 'https://via.placeholder.com/500'"
        alt="Profile Pic"
      />
    </div>
    <div class="w-full pl-4">
      <div class="flex">
        <div class="w-1/2">
          <h1 class="text-2xl md:text-4xl text-left text-gray-900 capitalize">
            {{ userStore.first_name + ' ' + userStore.last_name }}
          </h1>
          <span class="text-md text-gray-700 mt-2">
            <i><b>{{ userStore.city ? userStore.city  + ", " + userStore.state : "" }}</b></i>
          </span>
        </div>
        <div class="w-1/2 mt-2">
          <RouterLinkButton 
            btn-text="Edit Profile"
            color="green"
            url="/account/edit-profile"
          />
        </div>
      </div>
      <ProfileInfoSection :songsNumber="userStore.user_songs"/>
      <ProfileAboutSection :aboutText="userStore.description ?? ''" />
    </div>
  </div>
  <SongsSection />
  <YoutubeVideosSection />
  <PostsSection />
</template>

<script setup>
    import RouterLinkButton from '../../components/global/RouterLinkButton.vue';
    import ProfileInfoSection from '../../components/partials/profile/ProfileInfoSection.vue';
    import ProfileAboutSection from '../../components/partials/profile/ProfileAboutSection.vue';
    import SongsSection from '../../components/partials/profile/SongsSection.vue';
    import YoutubeVideosSection from '../../components/partials/profile/YoutubeVideosSection.vue';
    import PostsSection from '../../components/partials/profile/PostsSection.vue';
    import { useUserStore } from '@/stores/userStore';
    import { onMounted } from 'vue';
  
    let userStore = useUserStore()
    
    onMounted( async () => {
      await userStore.fetchUser()
    })


</script>
