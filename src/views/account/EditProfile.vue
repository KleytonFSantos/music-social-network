<template>
  <div id="EditProfile" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Edit Profile</div>
    <div class="bg-green-500 w-full h-1"></div>
    <CropperModal 
      v-if="showModal"
      :minAspectRatioProp="{ width: 8, height: 8 }"
      :maxAspectRatioProp="{ width: 8, height: 8 }"
      @croppedImageData="setCroppedImageData"
      @showModal="showModal = false" 
    />
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="First Name"
          placeholder="John"
          v-model:input="resource.first_name"
          input-type="text"
          :error="error"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Last Name"
          placeholder="Doe"
          v-model:input="resource.last_name"
          input-type="text"
          :error="error"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="City"
          placeholder="London"
          v-model:input="resource.city"
          input-type="text"
          :error="error"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="State"
          placeholder="UK"
          v-model:input="resource.state"
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
        @showModal="showModal = true"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <CropperImage 
          label="Cropped Image"
          :image="resource.profile_image"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextArea 
          label="Description"
          placeholder="Please enter a description"
          v-model:description="resource.description"
          :error="error"
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-8 mb-6">
      <div class="w-full px-3">
        <SubmitFormButton 
          @click="editProfile(resource)"
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
import CropperImage from "@/components/global/CropperImage.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import CropperModal from "@/components/global/CropperModal.vue";
import { profileService } from "@/services/profileService";
import { ref, reactive } from "vue";

let error = ref(null);

let resource = reactive({
  first_name: "",
  last_name: "",
  city: "",
  state: "",
  description: "",
  profile_image: "",
})

let showModal = ref(false);
// let imageData = null;

const setCroppedImageData = (data) => {
  // imageData = data
  resource.profile_image = data.imageUrl
}

const editProfile = async(resource) => {
  console.log('resource', resource)
  profileService.editProfile(resource)
}


</script>