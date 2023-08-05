<script setup>
import bookImage from "@/assets/img/book.png";
import { UserStore } from "@/store/userStore";
import { computed } from "vue";
import { overdueChecker, dateFormatter } from "@/hooks/dateFunctions";
import notFoundImage from "@/assets/img/no-book.png";
import {appURL} from '@/hooks/queryHandler'
const userStore = UserStore();
const borrowedBooks = computed(() => userStore.borrowedBooks || []);

const overdue = computed(() =>
  borrowedBooks.value.filter(
    (item) => (item.status === 1 || item.status ===4) && overdueChecker(item.due_date) >= 1
  )
);
</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Overdue Books</h6>

    <v-row>
      <v-col cols="12" md="10" sm="10" lg="10">
        <div>
          <v-row v-if="overdue.length > 0">
            <v-col
              cols="12"
              md="3"
              lg="3"
              sm="4"
              v-for="(item, index) in overdue"
              :key="index"
            >
              <router-link
                :to="{ name: 'overdueBookDetails', params: { id: item.id } }"
              >
                <div style="border: 1px solid #f0f0f0; background: #f7f7f7">
                  <img
                    class="w3-image"
                    :src="`${appURL}${item.Books?.image}`"
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
                    <div class="d-flex flex-row mt-1" style="line-height: 1.9">
                      <div>
                        <span class="days-left" style="color: red !important"
                          >{{ overdueChecker(item.due_date) }} day(s) left</span
                        >
                      </div>
                      <v-spacer></v-spacer>

                      <div>
                        <v-icon size="30" class="alert-icon">mdi-alert</v-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </v-col>
          </v-row>
          <div v-else class="text-center">
            <v-img :src="notFoundImage" max-height="500" />
            <h5>No Overdue books found</h5>
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
  font-weight: 600;
  text-align: right;
  line-height: normal;
}
.alert-icon {
  animation: blink 5s infinite !important;
}
@keyframes blink {
  0% {
    color: red;
  }

  40% {
    color: blue;
  }

  80% {
    color: orange;
  }
  100% {
    color: red;
  }
}

@-webkit-keyframes blink {
  0% {
    color: red;
  }

  40% {
    color: blue;
  }

  80% {
    color: orange;
  }
  100% {
    color: red;
  }
}
</style>
