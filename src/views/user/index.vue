<script setup>
import sidebar from "@/components/user/sidebar.vue";
import topbar from "@/components/user/topbar.vue";
import { UserStore } from "@/store/userStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = UserStore();
onMounted(() => {
  userStore.fetchUserDetails();
  userStore.fetchBooks();
  userStore.fetchBorrowedBooks();
  userStore.fetchInbox();
});
</script>

<template>
  <v-layout class="rounded rounded-md">
    <sidebar />

    <topbar />

    <v-main class="mt-4 pb-3" style="min-height: 100vh">
      <router-view :key="route.fullPath"></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped></style>
