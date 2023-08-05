<script setup>
import sidebar from "@/components/admin/sidebar.vue";
import topbar from "@/components/admin/topbar.vue";
import { AdminStore } from "@/store/adminStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const adminStore = AdminStore();
onMounted(() => {
 adminStore.fetchAdminDetails()
 adminStore.fetchBooks()
 adminStore.fetchBorrowedBooks()
 adminStore.fetchUsers()
 adminStore.fetchInbox()
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
