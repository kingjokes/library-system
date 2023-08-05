<script setup>
import bookImage from "@/assets/img/book.png";
import { appURL } from "@/hooks/queryHandler";
import { UserStore } from "@/store/userStore";
import { computed } from "vue";
const userStore = UserStore();
const books = computed(() => userStore.books || []);
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" lg="4" sm="6" v-for="(item,index) in books" :key="index">
        <router-link :to="{ name: 'bookDetails', params: { id: item?.id } }">
          <div style="border: 1px solid #f0f0f0; background: #f7f7f7">
            <img
              class="w3-image"
              :src="`${appURL}${item.image}`"
              style="width: 100%; height: 250px"
            />
            <br />
            <div class="px-2 py-4">
              <div>
                <span class="tag-container">
                  <span class="tag-text">{{ item.category }}</span>
                </span>
              </div>
              <br />
              <p class="book-title">
                {{ item.title }}
              </p>
              <br />
              <p class="book-author">{{ item.author }}</p>
            </div>
          </div>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.recommend-header {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.tag-container {
  border-radius: 15px;
  background: #d9d9d9;
  padding: 5px 10px;
}
.tag-text {
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.book-title {
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}
.book-author {
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
