<script setup>
import bookImage from "@/assets/img/book-small.png";
</script>

<template>
   <div class="container">
    <div>
      <span class="title">Requested books</span>
    </div>
    <div class="d-flex flex-row book-container mb-0" v-for="n in 5" :key="n">
      <div class="mr-3">
        <img style="height:65px" class="w3-image" :src="bookImage"  />
      </div>
      <div>
        <p class="book-title">Basic Sciences for Obstetrics and Gynaecology</p>
         
        <p class="book-author mt-2">Tim Chard</p>
      </div>
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
