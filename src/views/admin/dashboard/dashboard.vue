<script setup>

import { AdminStore } from "@/store/adminStore";
import overview from "@/views/admin/dashboard/overview.vue";
import { onMounted } from "vue";
import statistics from "./statistics.vue";
import overdue from "./overdue.vue";
import requested from "./requested.vue";
const adminStore= AdminStore()



onMounted(()=>{
 adminStore.fetchBooks()
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
        <!-- <statistics/> -->
        <br/>
        <overdue/>
      </v-col>
      <v-col cols="12" md="4" sm="4" lg="4">
        <requested/>
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
