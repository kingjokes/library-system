<script setup>
import { UserStore } from "@/store/userStore";
import overview from "@/views/user/dashboard/overview.vue";
import { onMounted } from "vue";
import recommendedBooks from "./recommendedBooks.vue";
import requestedBooks from "./requestedBooks.vue";
const userStore = UserStore()



onMounted(()=>{
 userStore.fetchBooks()
})
</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Dashboard</h6>
    <br />
    <v-row>
      <v-col cols="12" md="8" sm="8" lg="8">
        <overview />
        <br/>
        <recommended-books/>
      </v-col>
      <v-col cols="12" md="4" sm="4" lg="4">
        <requested-books/>
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
