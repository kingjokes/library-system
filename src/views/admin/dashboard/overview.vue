<script setup>

import { computed } from "vue";
import {overdueChecker} from '@/hooks/dateFunctions'
import { AdminStore } from "@/store/adminStore";
const adminStore = AdminStore()
const borrowedBooks = computed(()=>adminStore.borrowedBooks || [])
const borrowed = computed(()=>borrowedBooks.value.filter(item=>item.status ===1 || item.status===4))
const pending = computed(()=>borrowedBooks.value.filter(item=>item.status ===0))
const overdue = computed(()=>borrowedBooks.value.filter(item=>item.status === 1 && overdueChecker(item.due_date) >= 1))
const users = computed(()=>adminStore.users || [])


const overview = computed(() => {
  return [
    {
      title: "Total Borrowed books",
      value: borrowed.value.length,
      icon: "mdi-bookshelf",
      color: "#8ACA98",
    },
    {
      title: "Overdue Books",
      value: overdue.value.length,
      icon: "mdi-book-check-outline",
      color: "info",
    },
    {
      title: "Total Users",
      value: users.value.length,
      icon: "mdi-book-clock",
      color: "error",
    },
    {
      title: "Pending Requests",
      value: pending.value.length,
      icon: "mdi-inbox",
      color: "primary",
    },
  ];
});
</script>

<template>
  <v-row>
    <v-col
      cols="6"
      sm="6"
      md="3"
      lg="3"
      v-for="item in overview"
      :key="item.title"
    >
      <div style="border-radius: 15px; background: #f0f0f0; padding: 15px 13px">
        <h6 class="overview-title">{{ item.title }}</h6>
        <div class="d-flex flex-row">
          <div>
            <span class="overview-value">{{ item.value }}</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mt-2">
            <v-icon size="30" :color="item.color">{{ item.icon }}</v-icon>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.overview-title {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}
.overview-value {
  color: #000;
  font-family: Inter;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
