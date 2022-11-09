<template>
  <div id="EditProfile" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Edit Profile</div>
    <div class="bg-green-500 w-full h-1"></div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="First Name"
          placeholder="John"
          v-model:input="firstName"
          input-type="text"
          :error="error"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Last Name"
          placeholder="Doe"
          v-model:input="lastName"
          input-type="text"
          :error="error"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Location"
          placeholder="London, UK"
          v-model:input="location"
          input-type="text"
          :error="error"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <DisplayCropperButton 
        btn-text="Update Profile Image"
        label="Profile Image"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextArea 
          label="Description"
          placeholder="Please enter a description"
          v-model="description"
          :error="error"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-8 mb-6">
      <div class="w-full px-3">
        <SubmitFormButton 
          btn-text="Update Profile"
        />
      </div>
    </div>
  </div>
</template>  
<script setup>
import TextInput from "@/components/global/TextInput.vue";
import TextArea from "@/components/global/TextArea.vue";
import DisplayCropperButton from "@/components/global/DisplayCropperButton.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import { ref } from "vue";

let firstName = ref(null);
let lastName = ref(null);
let location = ref(null);
let description = ref(null);
let error = ref(null);
</script>