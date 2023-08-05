<script setup>
import bookImage from "@/assets/img/book.png";
import notFoundImage from '@/assets/img/no-book.png'
import { UserStore } from "@/store/userStore";
import { computed } from "vue";
import {appURL} from '@/hooks/queryHandler'
import { overdueChecker,dateFormatter } from "@/hooks/dateFunctions";
const userStore = UserStore();
const borrowedBooks = computed(() => userStore.borrowedBooks || []);
const borrowed = computed(() =>
  borrowedBooks.value.filter((item) => item.status === 1 || item.status===4)
);
</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Borrowed Books</h6>

    <v-row>
      <v-col cols="12" md="10" sm="10" lg="10">
        <div>
          <v-row v-if="borrowed.length>0">
            <v-col cols="12" md="3" lg="3" sm="4" v-for="(item,index) in borrowed" :key="index">
              <router-link
                :to="{ name: 'borrowedBookDetails', params: { id: item.id } }"
              >
                <div style="border: 1px solid #f0f0f0; background: #f7f7f7">
                  <img
                    class="w3-image"
                    :src="`${appURL}${item.Books.image}`"
                    style="width: 100%; height: 250px"
                  />
                  <br />
                  <div class="px-2 py-4">
                    <div>
                      <span class="tag-container">
                        <span class="tag-text">{{ item.Books.category }}</span>
                      </span>
                    </div>
                    <br />
                    <p class="book-title">
                      {{ item.Books.title }}
                    </p>
                    <br />
                    <p class="book-author">{{ item.Books.author }}</p>
                    
                    <div class="d-flex flex-row mt-3" style="line-height: 1.9;">
                      <div>
                        <b style="font-size: 12px;">Request Date:</b><br/>
                        <span class="days-left">{{ dateFormatter(item.request_date) }}</span>

                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <b style="font-size: 12px;">Days Left:</b><br/>
                        <span class="days-left">{{ overdueChecker(item.due_date) }} day(s) left</span>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </router-link>
            </v-col>
          </v-row>
          <div v-else class="text-center">

            <v-img :src="notFoundImage" max-height="500"/>
            <h5>No Borrowed books found</h5>
            
          </div>
        </div>
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
.days-left {
  color: #000;

  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  text-align: right;
  line-height: normal;
}
</style>
