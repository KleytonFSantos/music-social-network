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
              label="Email"
              :labelColor="false"
              error=""
              placeholder="type your email"
              v-model:input="form.email"
              inputType="email"
            />
            <TextInput 
              label="Password"
              :labelColor="false"
              :error="error"
              placeholder="*******"
              v-model:input="form.password"
              inputType="password"
            />
          </div>
          <button
            @click="login(form, error)"
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
          >
            Login
          </button>

          <p class="text-center text-sm text-gray-100 mt-2">
            Don't have an account yet?
            <router-link
              class="text-blue-500 no-underline hover:underline"
              to="register"
            >
              Register
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { authService } from "@/services/authService";
  import router from "@/router";
  import TextInput from '@/components/global/TextInput.vue';
  
  import { reactive, ref } from '@vue/reactivity';
  let form = reactive({
    email: '',
    password: '',
  })
  
  let error = ref(null)
  const login = (form) => {
    authService.login(form, () => {
      router.push('/account/profile')
    }, () => {
      console.log('deu erro')
      error.value = 'As credenciais estão incorretas.';
    })
  }
</script>
