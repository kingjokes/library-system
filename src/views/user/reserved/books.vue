<script setup>
import bookImage from "@/assets/img/book.png";
import { UserStore } from "@/store/userStore";
import notFoundImage from '@/assets/img/no-book.png'
import { computed } from "vue";
import { overdueChecker } from "@/hooks/dateFunctions";
import {appURL} from '@/hooks/queryHandler'
const userStore = UserStore();
const borrowedBooks = computed(() => userStore.borrowedBooks || []);

const reserved = computed(() =>
  borrowedBooks.value.filter((item) => item.status === 3)
);
</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Reserved Books</h6>

    <v-row>
      <v-col cols="12" md="10" sm="10" lg="10">
        <div>
          <v-row v-if="reserved.length>0">
            <v-col
              cols="12"
              md="3"
              lg="3"
              sm="4"
              v-for="(item, index) in reserved"
              :key="index"
            >
              <router-link
                :to="{
                  name: 'reservedBookDetails',
                  params: { reqid: item.id, book_id: item.Books.id },
                }"
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
                    <p class="days-left">
                      <span class="chip">
                        <span class="chip-content"
                          >Available:
                          <span
                            style="color: #8aca98 !important"
                            v-if="item?.Books?.status === 0"
                            >Yes</span
                          >
                          <span style="color: #DB8E8E; !important" v-else
                            >No</span
                          >
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </router-link>
            </v-col>
          </v-row>
          <div v-else class="text-center">
            <v-img :src="notFoundImage" max-height="500" />
            <h5>No Reserved books found</h5>
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
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 200;
  text-align: right;
  line-height: normal;
}
.chip {
  /* display: inline-flex; */
  padding: 8px 15px 7px 19px;
  font-size: 13px !important;

  /* justify-content: flex-end; */
  /* align-items: center; */
  border-radius: 15px;
  background: #f0f0f0;
}

.chip-content {
  color: rgba(0, 0, 0, 0.5);
  font-family: Inter;
  font-size: 13px !important;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
