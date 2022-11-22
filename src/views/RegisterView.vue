<template>
  <div id="Register">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-black p-8 shadow rounded mb-6">
          <h1 class="mb-6 text-lg text-gray-100 font-thin">
            Let's get rocking!
          </h1>

          <div class="mb-4">
            <TextInput 
              label="First Name"
              :labelColor="false"
              placeholder="John"
              v-model:input="form.first_name"
              inputType="text"
            />
            <TextInput 
              label="Last Name"
              :labelColor="false"
              placeholder="Stark"
              v-model:input="form.last_name"
              inputType="text"
            />
            <TextInput 
              label="Email"
              :labelColor="false"
              placeholder="email@email.com"
              v-model:input="form.email"
              inputType="email"
            />
            <TextInput 
              label="Password"
              :labelColor="false"
              placeholder="*******"
              v-model:input="form.password"
              inputType="password"
            />
            <TextInput 
              label="Confirm Password"
              :labelColor="false"
              placeholder="*******"
              v-model:input="form.password_confirmation"
              inputType="password"
              :error="error"
            />
          </div>
          <button
            class="
              block
              w-full
              bg-green-500
              text-white
              rounded-sm
              py-3
              text-sm
              tracking-wide
            "
            @click="register(form, error)"
          >
            Register
          </button>

          <p class="text-center text-md text-gray-100 mt-2">
            Already have an account?
            <router-link
              class="text-blue-500 no-underline hover:underline"
              to="login"
            >
            Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import TextInput from '@/components/global/TextInput.vue';
  import { authService } from '@/services/authService';
  import { ref, reactive } from 'vue'
  import router from "@/router";

  let form = reactive({
      first_name : "",
      last_name : "",
      email : "",
      password : "",
      password_confirmation : "",
  })
 
  let error = ref(null);
  const register = (form) => {
    authService.register(form, (res) => {
      router.push('/account/profile/' + res.user.id)
    }, () => {
      
      error.value = "erro no cadastro";
    })
  }
  
</script>
