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
              v-model:input="firstName"
              inputType="text"
              :error="error"
            />
            <TextInput 
              label="Last Name"
              :labelColor="false"
              placeholder="Stark"
              v-model:input="lastName"
              inputType="text"
              :error="error"
            />
            <TextInput 
              label="Email"
              :labelColor="false"
              placeholder="email@email.com"
              v-model:input="email"
              inputType="email"
              :error="error"
            />
            <TextInput 
              label="Password"
              :labelColor="false"
              placeholder="*******"
              v-model:input="password"
              inputType="password"
              :error="error"
            />
            <TextInput 
              label="Confirm Password"
              :labelColor="false"
              placeholder="*******"
              v-model:input="confirmationPassword"
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
  import { ref } from 'vue'

  let firstName = ref(null);
  let lastName = ref(null);
  let email = ref(null);
  let password = ref(null);
  let confirmationPassword = ref(null);
  let error = ref(null);
</script>
