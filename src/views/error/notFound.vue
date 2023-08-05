<template>
  <v-row class="px-3">
    <v-col cols="12" md="2" lg="2" sm="2">
      &nbsp;
    </v-col>
    <v-col cols="12" md="8" lg="8" sm="8" class="text-center">
      <br/>
      <v-img class="mt-3" :src="errorImage" max-height="500"/>
      <br/>

      <v-btn :to="{name:'login'}" class="text-capitalize" color="primary" flat width="200">
        <span>Go Home</span>
      </v-btn>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "notFound"
}
</script>
<script setup>
import {useRouter} from "vue-router";
import errorImage from '@/assets/img/not-found.png'

</script>

<style scoped>

</style>
