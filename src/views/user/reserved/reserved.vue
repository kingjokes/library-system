<script setup>
import bookImage from "@/assets/img/4.png";
import { onMounted, ref } from "vue";
import { UserStore } from "@/store/userStore";
import { useRoute } from "vue-router";
import { dateFormatter } from "@/hooks/dateFunctions";
import {appURL} from '@/hooks/queryHandler'
const orderOption = [
  { title: "Pick Up", value: "pick_up" },
  { title: "Deliver to department library", value: "library" },
];
const selectedOption = ref("pick_up");
const userStore = UserStore();
const route = useRoute();
const dialog = ref(false);
onMounted(() => {
  userStore.fetchBookDetails(route.params.book_id);
});
</script>

<template>
  <div style="margin: 0 auto" v-if="userStore.bookDetails === ''">
    <div style="margin-top: 30vh" class="text-center">
      <v-progress-circular
        indeterminate
        color="success"
        size="40"
      ></v-progress-circular>
    </div>
  </div>
  <v-img class="px-5" v-else>
    <h6 class="header">Library</h6>
    <br />
    <v-row>
      <v-col cols="12" md="1" sm="1" lg="1"> </v-col>
      <v-col cols="12" md="5" sm="5" lg="5">
        <h3>{{ userStore.bookDetails?.title }}</h3>
        <img  :src="`${appURL}${userStore.bookDetails.image}`" style="height: 500px; width: 100%" />
      </v-col>

      <v-col cols="12" md="5" sm="5" lg="5">
        <br class="w3-hide-small"/>
        <br class="w3-hide-small"/>
        <br class="w3-hide-small"/>
        <br class="w3-hide-small"/>
        <p class="content">
          {{ userStore.bookDetails?.description }}
        </p>

        <p class="content">Genres:{{ userStore.bookDetails?.category }}</p>
        <p class="content">
          Published:
          {{ dateFormatter(userStore.bookDetails?.published_date) }} by
          {{ userStore.bookDetails?.publisher }}
        </p>
        <p class="content">ISBN: {{ userStore.bookDetails?.isbn }}</p>
        <!-- <p class="content">Language: English</p> -->
        <br />

        <div>
          <span class="chip">
            <span class="chip-content"
              >Available:
              <span
                style="color: #8aca98 !important"
                v-if="userStore.bookDetails?.status === 0"
                >Yes</span
              >
              <span style="color: #DB8E8E; !important" v-else>No</span>
            </span>
          </span>
          &nbsp; &nbsp; &nbsp;
          <span class="chip">
            <span class="chip-content"
              >Duration: {{ userStore.user?.role === "student" ? 1 : 2 }}
              week
              {{ userStore.user?.role === "student" ? "" : "s" }}
            </span>
          </span>
        </div>
        <br />
        <select class="chip" v-model="selectedOption">
          <option
            class="chip-content"
            v-for="item in orderOption"
            :key="item.value"
            :value="item.value"
          >
            {{ item.title }}
          </option>
        </select>
        <br />
        <br />
        <v-btn
          @click="dialog = true"
          color="#000"
          class="text-white text-capitalize"
          flat
          width="150"
        >
          <span>
            {{
              userStore.bookDetails?.status === 0
                ? "Order Book"
                : "Reserve Book"
            }}</span
          >
        </v-btn>
      </v-col>
    </v-row>
  </v-img>

  <v-dialog v-model="dialog" max-width="600" persistent>
    <v-card>
      <v-card-text class="px-6 py-7">
        <div class="text-center">
          <v-icon color="success" size="80">
            mdi-checkbox-marked-circle-outline
          </v-icon>
          <h6 class="dialog-title">Success</h6>
          <br />
          <p class="dialog-content">
            Thank you for borrowing a book from our library! We hope that you
            find the information you're looking for and enjoy the read. Please
            remember to return the book on or before the due date so that others
            can benefit from our resources. Please come along with the
            institution valid ID card for book collection. If you have any
            questions or concerns, don't hesitate to contact us. We appreciate
            your continued support and hope to see you soon!
          </p>
          <br />
          <v-btn
            @click="dialog = false"
            color="#000"
            class="text-white text-capitalize"
            flat
            width="50"
          >
            <span>Ok</span>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
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
.content {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.9; /* 33.1px */
  margin-bottom: 10px;
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

.dialog-title {
  color: #7dc68d;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.dialog-content {
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 216.023%; /* 51.845px */
}
</style>
