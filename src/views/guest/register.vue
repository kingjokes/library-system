<script setup>
import Logo from "@/assets/img/oau.png";
import { toastMessage } from "@/hooks/toasters";
import { UserStore } from "@/store/userStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const form = ref([
  {
    title: "First Name",
    placeholder: "First Name",
    value: "",
    col: 6,
    type: "text",
    key: "firstname",
  },
  {
    title: "Last Name",
    placeholder: "Last Name",
    value: "",
    col: 6,
    type: "text",
    key: "lastname",
  },
  {
    title: "Email Address",
    placeholder: "Email",
    value: "",
    col: 12,
    type: "email",
    key: "email",
  },
  {
    title: "Address",
    placeholder: "Enter your Address",
    value: "",
    col: 12,
    type: "text",
    key: "address",
  },
  {
    title: "Phone number",
    placeholder: "+234",
    value: "",
    col: 6,
    type: "number",
    key: "phone",
  },
  {
    title: "Role",
    placeholder: "Select your role",
    value: "student",
    col: 6,
    type: "",
    key: "role",
  },
  {
    title: "Department",
    placeholder: "Computer Science and Engineering",
    value: "",
    col: 12,
    type: "text",
    key: "dept",
  },
  {
    title: "Matric Number",
    placeholder: "Enter your Matric Number",
    value: "",
    col: 12,
    type: "text",
    key: "matric",
    extra: "user",
  },
  // {title: 'Staff ID', placeholder: 'Enter your staff ID', value: '', col: 12, type: 'text', key: 'staffid', extra:'user'},
  {
    title: "Password",
    placeholder: "At least 8 characters",
    value: "",
    col: 12,
    type: "password",
    key: "password",
  },
]);

const userType = computed(() => {
  let find = form.value.find((item) => item.key === "role");
  return find.value;
});
const emailFormat = (value) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value);
};

const roleOptions = ref([
  { title: "Student", value: "student" },
  { title: "Staff", value: "staff" },
]);

const deptOptions = ref([
  { title: "Computer Science and  Engineering" },
  { title: "Electrical & Electronics Engineering" },
  { title: "Mechanical Engineering" },
  { title: "Civil Engineering" },
]);

const signupForm = ref(null);
const loading = ref(false);
const userStore = UserStore();
const router = useRouter();
const register = async () => {
  const { valid } = await signupForm.value.validate();
  if (valid) {
    let payload = {};
    form.value.map((item) => {
      if (item.key !== "matric") {
        payload[item.key] = item.value;
      }
    });
    let find = form.value.find((item) => item.key === "matric");

    payload[userType.value === "student" ? "matric" : "staff_id"] = find.value;

    if (!emailFormat(payload.email))
      return toastMessage("error", "Invalid email supplied");
    if (payload.password.length < 8)
      return toastMessage("error", "Password must be at least 8 characters");

    loading.value = true;

    await userStore
      .registerUser(payload)
      .then((response) => response.data)
      .then((response) => {
        loading.value = false;
        toastMessage(response.status ? "success" : "error", response.message);
        if (response.status) {
          router.push({ name: "login" });
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
              <p class="side-content">
                Join our library community and <br />
                gain access to a world of <br />
                knowledge!
              </p>
              <br />
              <h6 class="side-header">
                Signing up is <br />
                quick and easy
              </h6>
            </div>
          </v-col>
          <v-col cols="12" md="1" sm="1" lg="1" class="w3-hide-small"></v-col>
          <v-col
            cols="12"
            md="5"
            sm="5"
            lg="5"
            style="background: #ffffff; min-height: 100vh"
          >
            <br />
            <h5 class="form-title">Create An Account</h5>
            <br />
            <v-form ref="signupForm" @submit.prevent="register">
              <v-row class="px-2" :dense="true">
                <v-col
                  cols="12"
                  :sm="item.col"
                  :md="item.col"
                  :lg="item.col"
                  v-for="(item, index) in form"
                  :key="index"
                >
                  <label class="form-label" v-if="item.key !== 'matric'">{{
                    item.title
                  }}</label>
                  <v-select
                    v-if="item.key === 'role'"
                    :placeholder="item.placeholder"
                    :items="roleOptions"
                    item-title="title"
                    item-value="value"
                    :type="item.type"
                    variant="filled"
                    density="compact"
                    class="mb-n4"
                    v-model="item.value"
                    :rules="[() => !!item.value || 'Required']"
                  ></v-select>
                  <div v-else-if="item.key === 'matric'">
                    <label class="form-label">{{
                      userType === "student" ? item.title : "Staff ID"
                    }}</label>
                    <v-text-field
                      :placeholder="
                        userType === 'student'
                          ? item.placeholder
                          : 'Enter your staff ID'
                      "
                      :type="item.type"
                      variant="filled"
                      density="compact"
                      class="mb-n5"
                      v-model="item.value"
                      :rules="[() => !!item.value || 'Required']"
                    />
                  </div>

                  <v-autocomplete
                    persistent-placeholder
                    v-else-if="item.key === 'dept'"
                    :placeholder="item.placeholder"
                    :items="deptOptions"
                    item-title="title"
                    item-value="title"
                    :type="item.type"
                    variant="filled"
                    density="compact"
                    class="mb-n4"
                    v-model="item.value"
                    :rules="[() => !!item.value || 'Required']"
                  ></v-autocomplete>

                  <v-text-field
                    v-else
                    :placeholder="item.placeholder"
                    :type="item.type"
                    variant="filled"
                    density="compact"
                    class="mb-n4"
                    v-model="item.value"
                    :rules="[() => !!item.value || 'Required']"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
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
                  <span>Sign Up</span>
                </v-btn>

                <br />
                <br />
                <p class="reg">
                  Already have an account?
                  <router-link
                    style="color: rgba(43, 81, 155, 0.8) !important"
                    :to="{ name: 'login' }"
                    >Login</router-link
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
</style>
