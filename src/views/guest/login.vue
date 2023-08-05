<script setup>
import Logo from "@/assets/img/oau.png";
import { toastMessage } from "@/hooks/toasters";
import { UserStore } from "@/store/userStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const mode = ref("student");
const label = computed(() => {
  if (mode.value === "student") return "Matric Number";
  return "Staff ID";
});

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const options = ref([
  { title: "Student", value: "student" },
  { title: "Staff", value: "staff" },
]);
const loading = ref(false);
const userStore = UserStore();
const router = useRouter();
const loginForm = ref(null);
const login = async () => {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    loading.value = true;
    await userStore
      .loginUser({
        field: mode.value === "student" ? "matric" : "staff_id",
        username: username.value,
        password: password.value,
      })
      .then((response) => response.data)
      .then(async (response) => {
        loading.value = false;
        toastMessage(response.status ? "success" : "error", response.message);
        if (response.status) {
          userStore.$patch({
            token: response.accessToken,
          });
          await router.push({ name: "dashboard" });
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
  <v-layout>
    <v-main>
      <v-img>
        <v-row>
          <v-col
            cols="12"
            md="5"
            sm="5"
            lg="5"
            style="background: #f0f0f0; min-height: 100vh"
          >
            <div class="text-center">
              <br />
              <br />
              <v-img :src="Logo" max-height="330"></v-img>
              <br />
              <p class="side-content">Nice to see you again</p>
              <br />
              <h6 class="side-header">Welcome back</h6>
            </div>
          </v-col>
          <v-col cols="12" md="1" sm="1" lg="1" class="w3-hide-small"></v-col>
          <v-col
            cols="12"
            md="5"
            sm="5"
            lg="4"
            style="background: #ffffff; min-height: 103vh"
          >
            <br />

            <div class="d-flex flex-row" style="padding-top: 50px">
              <div v-for="item in options" :key="item.value">
                <v-btn
                  @click="mode = item.value"
                  :class="item.value === mode ? 'active' : 'inactive'"
                  variant="flat"
                  class="text-capitalize"
                >
                  <span>{{ item.title }}</span>
                </v-btn>
              </div>
            </div>
            <br />
            <br />
            <h5 class="form-title">Login</h5>
            <br />
            <v-form ref="loginForm" @submit.prevent="login">
              <v-row class="px-2" :dense="true">
                <v-col cols="12" :sm="12" :md="12" :lg="12">
                  <label class="form-label"> Username</label>

                  <v-text-field
                    :placeholder="label"
                    :type="'text'"
                    variant="filled"
                    density="compact"
                    class="mb-n1"
                    v-model="username"
                    :rules="[() => !!username || 'Required']"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" :sm="12" :md="12" :lg="12">
                  <label class="form-label"> Password</label>

                  <v-text-field
                    :placeholder="'Enter Password'"
                    :type="showPassword ? 'text' : 'password'"
                    variant="filled"
                    density="compact"
                    class="mb-n1"
                    v-model="password"
                    :rules="[() => !!password || 'Required']"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append-inner="showPassword = !showPassword"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <br />
              <div class="d-flex flex-row">
                <div class="mt-n5">
                  <v-checkbox>
                    <template v-slot:label>
                      <div class="checkbox">Remember me</div>
                    </template>
                  </v-checkbox>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <router-link
                    class="forgot-password"
                    :to="{ name: 'register' }"
                  >
                    Forgot Password
                  </router-link>
                </div>
              </div>
              <br />
              <div class="text-center">
                <v-btn
                  :loading="loading"
                  type="submit"
                  color="#000"
                  class="text-white text-capitalize"
                  flat
                  width="150"
                >
                  <span>Login</span>
                </v-btn>

                <br />
                <br />
                <br />
                <p class="reg">
                  Don't have an account?
                  <router-link
                    style="color: rgba(43, 81, 155, 0.8) !important"
                    :to="{ name: 'register' }"
                    >Click Here</router-link
                  >
                </p>
                <br />
              </div>
            </v-form>
          </v-col>
          <v-col cols="12" md="1" sm="1" lg="1" class="w3-hide-small"></v-col>
        </v-row>
      </v-img>
    </v-main>
  </v-layout>
</template>

<style scoped>
.side-content {
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
}

.side-header {
  color: #000;
  text-align: center;
  font-size: 35px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.6;
}

.form-title {
  color: #000;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.form-label {
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.reg {
  color: rgba(0, 0, 0, 0.8);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.inactive {
  color: rgba(0, 0, 0, 0.2);
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.active {
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.checkbox {
  color: rgba(0, 0, 0, 0.4);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.forgot-password {
  color: rgba(0, 0, 0, 0.4);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
