<template>
  <div>
    <button
      @click="open = !open"
      class="
        bg-transparent
        hover:bg-green-400
        text-white
        font-semibold
        hover:text-white
        py-1
        px-2
        hover:border-transparent
        rounded
      "
    >
      <i class="fa-solid fa-bars fa-xl"></i>
    </button>
    <div
      v-show="open"
      class="
        animated
        slideInDown
        faster
        fixed
        w-full
        h-full
        top-0
        left-0
        flex
        justify-center
        backdrop-blur-sm
      "
    >
      <div class="bg-black absolute w-full h-full opacity-75 flex justify-center">
        <div class="my-auto fixed border-white w-80 pt-16">
          <p class="text-2xl text-center text-white font-bold">Menu</p>
          <div class="pt-2">
            <RouterLinkButton
              class="w-full text-gray-100 text-center text-lg"
              btn-text="Profile"
              color="green"
              :url="'/account/profile/' + user_id"
            />
          </div>
          <div class="pt-10 mt-6">
            <RouterLinkButton
              @click="logout()"
              class="w-full text-gray-100 text-center text-lg"
              btn-text="Logout"
              color="red"
            />
          </div>
          <div class="pt-10 mt-6">
            <RouterLinkButton
              @click="open = !open"
              class="w-full text-gray-100 text-center text-lg"
              btn-text="Close"
              color="yellow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, ref } from "vue";
  import RouterLinkButton from '../global/RouterLinkButton.vue';
  import { authService } from '@/services/authService'
  
  let open = ref(false);
  let user_id = ref(false);
  
  onMounted(() => {
        getUserId();
  })
  
  const getUserId = () => {
    authService.getUser((data) => {
      user_id.value = data.user_id
    }, (err) => {
      console.log(err)
    })
  }

  const logout = () => {
    authService.logout();
  }
  
</script>