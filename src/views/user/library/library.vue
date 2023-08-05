<script setup>
import books from './books.vue';
import requestedBooks from '../dashboard/requestedBooks.vue';
import recommended from './recommended.vue'

</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Library</h6>
    
    <v-row>
      <v-col cols="12" md="8" sm="8" lg="8"> 

        <books/>

      </v-col>
      <v-col cols="12" md="4" sm="4" lg="4">
        <requested-books/>
        <br/>
        <br/>
        <br/>
        <recommended/>

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
