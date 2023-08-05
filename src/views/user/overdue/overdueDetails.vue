<script setup>
import bookImage from "@/assets/img/4.png";
import { onMounted, ref } from "vue";
import { UserStore } from "@/store/userStore";
import { useRoute } from "vue-router";
import { dateFormatter, overdueChecker } from "@/hooks/dateFunctions";
import { toastMessage } from "@/hooks/toasters";
import { appURL } from "@/hooks/queryHandler";

const userStore = UserStore();
const route = useRoute();
const dialog = ref(false);
const loading = ref(false);
const returnBook = async () => {
  loading.value = true;
  await userStore
    .returnBook({
      status: 4,
      user_id: userStore.user?.id,
      book_id: userStore.borrowedBookDetails?.book_id,
    })
    .then((response) => response.data)
    .then(async (response) => {
      loading.value = false;
      toastMessage(response.status ? "success" : "error", response.message);
      if (response.status) {
        dialog.value = true;
        userStore.fetchBorrowedBookDetails(route.params.id);
        userStore.fetchBorrowedBooks();
      }
    })
    .catch((e) => {
      loading.value = false;
      toastMessage("error", e.message);
    });
};
onMounted(() => {
  userStore.fetchBorrowedBookDetails(route.params.id);
});
</script>

<template>
  <div style="margin: 0 auto" v-if="userStore.borrowedBookDetails === ''">
    <div style="margin-top: 30vh" class="text-center">
      <v-progress-circular
        indeterminate
        color="success"
        size="40"
      ></v-progress-circular>
    </div>
  </div>
  <v-img v-else class="px-5">
    <h6 class="header">Book Details</h6>
    <br />
    <v-row>
      <v-col cols="12" md="1" sm="1" lg="1"> </v-col>
      <v-col cols="12" md="5" sm="5" lg="5">
        <h3>{{ userStore.borrowedBookDetails?.Books?.title }}</h3>
        <img
          :src="`${appURL}${userStore.borrowedBookDetails?.Books.image}`"
          style="height: 500px; width: 100%"
        />
      </v-col>

      <v-col cols="12" md="5" sm="5" lg="5">
        <br class="w3-hide-small" />
        <br class="w3-hide-small" />
        <br class="w3-hide-small" />
        <br class="w3-hide-small" />
        <p class="content">
          {{ userStore.borrowedBookDetails?.Books?.description }}
        </p>

        <p class="content">
          Genres:{{ userStore.borrowedBookDetails?.Books?.category }}
        </p>
        <p class="content">
          Published:
          {{
            dateFormatter(userStore.borrowedBookDetails?.Books?.published_date)
          }}
          by
          {{ userStore.borrowedBookDetails?.Books?.publisher }}
        </p>
        <p class="content">
          ISBN: {{ userStore.borrowedBookDetails?.Books?.isbn }}
        </p>

        <br />

        <div>
          <span class="chip">
            <span class="chip-content">Overdue</span>
          </span>
        </div>

        <br />
        <v-btn
          v-if="userStore.borrowedBookDetails.status === 1"
          @click="returnBook"
          :loading="loading"
          color="#000"
          class="text-white text-capitalize mt-2"
          flat
          width="150"
        >
          <span>Return Book</span>
        </v-btn>
        <v-btn
          v-if="userStore.borrowedBookDetails.status === 4"
          disabled
          color="#000"
          class="text-white text-capitalize mt-2"
          flat
          width="200"
        >
          <span>Pending Return Request</span>
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
            Thank you for returning your book to our library! Our admin team has
            been notified of the return and will confirm it as soon as possible.
            Once the return is confirmed, your account will be updated
            accordingly. If you have any questions or concerns about your
            account, please don't hesitate to contact us. Thank you for being a
            valued member of our library community and we appreciate your
            patience.
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
