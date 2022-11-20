<template>
  <div class="container max-w-4xl mx-auto flex mt-10">
    <div class="w-1/3">
      <img
        v-if="user"
        class="w-full rounded-lg h-auto shadow-lg"
        :src="user.profile_image 
        ?? 'https://via.placeholder.com/500'"
        alt="Profile Pic"
      />
    </div>
    <div class="w-full pl-4">
      <div class="flex">
        <div class="w-1/2">
          <h1 class="text-2xl md:text-4xl text-left text-gray-900 capitalize" v-if="user">
            {{ user.first_name + ' ' + user.last_name }}
          </h1>
          <span class="text-md text-gray-700" v-if="user">
            <i><b>{{ user.city ? user.city  + ", " + user.state : "" }}</b></i>
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
      <ProfileInfoSection />
      <ProfileAboutSection v-if="user" :aboutText="user.description ?? ''" />
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
    import { authService } from '@/services/authService';
    import { ref } from 'vue';
    
    let user = ref(null)
    let error = ref(null)
    const getUser = () => {
      authService.getUser((data) => {
        user.value = data
        console.log(data);
      }, (err) => {
        error.value = err;
      })
      
    }
    getUser();

</script>
