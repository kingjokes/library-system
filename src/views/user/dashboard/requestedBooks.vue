<script setup>
import bookImage from "@/assets/img/book-small.png";
import { UserStore } from "@/store/userStore";
import { computed } from "vue";
import { appURL } from "@/hooks/queryHandler";
const userStore = UserStore();
const borrowedBooks = computed(() => userStore.borrowedBooks || []);
const borrowedChunked = computed(() => borrowedBooks.value.slice(0, 5));
</script>

<template>
  <div class="container">
    <div>
      <span class="title">Requested books</span>
    </div>
    <div
      class="book-container mb-0"
      style="width: 100% !important"
      v-for="(item, index) in borrowedChunked"
      :key="index"
    >
      <router-link :to="{ name: 'bookDetails', params: { id: item.id } }">
        <div class="d-flex flex-row">
          <div class="mr-3">
            <img
              style="height: 65px"
              class="w3-image"
              :src="`${appURL}${item.Books?.image}`"
            />
          </div>
          <div>
            <p class="book-title">{{ item.Books.title }}</p>

            <p class="book-author mt-2 mb-1">{{ item.Books.author }}</p>

            <p
              v-if="item.status === 0"
              style="color: goldenrod; font-size: 10px"
            >
              Pending
            </p>
            <p v-if="item.status === 1" style="color: green; font-size: 10px">
              Approved
            </p>
            <p v-if="item.status === 2" style="color: blue; font-size: 10px">
              Returned
            </p>
            <p v-if="item.status === 3" style="color: brown; font-size: 10px">
              Reserved
            </p>
            <p v-if="item.status === 4" style="color: cyan; font-size: 10px">
              Pending Return
            </p>
          </div>
        </div>
      </router-link>
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
