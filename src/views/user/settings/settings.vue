<script setup>
import { ref } from "vue";
import { UserStore } from "@/store/userStore";
import { toastMessage } from "@/hooks/toasters";
import { useRouter } from "vue-router";
const password = ref("");
const confirmPass = ref("");
const oldPassword = ref("");
const userStore = UserStore();

const settingsForm = ref(null);
const loading = ref(false);
const router = useRouter();

const changeUserPassword = async () => {
  const { valid } = await settingsForm.value.validate();
  if (valid) {
    loading.value = true;
    await userStore
      .changePassword({
        oldPassword: oldPassword.value,
        password: password.value,
      })
      .then((response) => response.data)
      .then(async (response) => {
        loading.value = false;
        await toastMessage(
          response.status ? "success" : "error",
          response.message
        );
        if (response.status) {
          userStore.$reset();
          await router.push({ name: "login" });
        }
      })
      .catch((e) => {
        loading.value = false;
        toastMessage("error", e.message);
      });
  }
};
</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Settings</h6>

    <v-row>
      <v-col cols="12" md="1" sm="1" lg="1"> </v-col>
      <v-col cols="12" md="6" sm="6" lg="6">
        <h5 class="title">Create New Password</h5>
        <p class="subtitle">
          Your new password must be unique from those previously used.
        </p>
        <br />
        <br />

        <v-form ref="settingsForm" @submit.prevent="changeUserPassword">
          <div class="myform">
            <v-text-field
              style="border-radius: 10px !important"
              variant="underlined"
              color="primary"
              type="password"
              class="mb-1"
              density="comfortable"
              label="Old password"
              v-model="oldPassword"
              rounded
              :rules="[() => !!oldPassword || 'Required']"
            >
            </v-text-field>
            <v-text-field
              style="border-radius: 10px !important"
              variant="underlined"
              color="primary"
              type="password"
              class="mb-1"
              density="comfortable"
              label="New password"
              v-model="password"
              :rules="[
                () => !!password || 'Required',
                () => password.length >= 8 || 'Password is too short',
              ]"
              rounded
            >
            </v-text-field>
            <v-text-field
              style="border-radius: 10px !important"
              variant="underlined"
              color="primary"
              type="password"
              class="mb-1"
              density="comfortable"
              label="Confirm password"
              v-model="confirmPass"
              :rules="[
                () => !!confirmPass || 'Required',
                () => confirmPass === password || 'Password does not match',
              ]"
              rounded
            >
            </v-text-field>
          </div>
          <br />
          <br />
          <v-btn
            height="40"
            block
            :loading="loading"
            type="submit"
            color="#000"
            class="send-button text-white text-capitalize"
            flat
            rounded
          >
            Reset Password
          </v-btn>
          <br />
        </v-form>
      </v-col>
    </v-row>
  </v-img>
</template>

<style scoped>
.header {
  color: #000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
