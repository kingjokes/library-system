<script setup>
import bookImage from "@/assets/img/book-small.png";
import { UserStore } from "@/store/userStore";
import { computed } from "vue";
import { appURL } from "@/hooks/queryHandler";
const userStore = UserStore();
const books = computed(() => userStore.books || []);
const recommendedBooks = computed(() => books.value.slice(0, 4));
</script>

<template>
  <div class="container">
    <div>
      <span class="title">Recommended books</span>
    </div>
    <div
      class="book-container mb-0"
      v-for="(item, index) in recommendedBooks"
      :key="index"
      style="width: 100% !important"
    >
      <router-link :to="{ name: 'bookDetails', params: { id: item.id } }">
        <div class="d-flex flex-row">
          <div class="mr-3">
            <img
              style="height: 65px"
              class="w3-image"
              :src="`${appURL}${item.image}`"
            />
          </div>
          <div>
            <p class="book-title">{{ item.title }}</p>

            <p class="book-author mt-2">{{ item.author }}</p>
          </div>
        </div>
      </router-link>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: inline-flex;
  width: 100%;
  padding: 16px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  background: #f0f0f0;
}
.title {
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.book-container {
  border-radius: 15px;
  background: #fff;
  padding: 10px 15px;
}
.book-title {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.book-author {
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
</style>
