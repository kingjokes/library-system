<script setup>
import { UserStore } from "@/store/userStore";
import { VDataTable } from "vuetify/labs/VDataTable";
import { dateFormatter } from "@/hooks/dateFunctions";
import { computed, ref } from "vue";
const userStore = UserStore();
const inbox = computed(() => userStore.inbox || []);
const headers = ref([
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Book",
    align: "start",
    // sortable: true,
    key: "Books",
  },
  {
    title: "Subject",
    align: "start",
    // sortable: true,
    key: "subject",
  },
  {
    title: "Message",
    align: "start",
    // sortable: false,
    key: "message",
  },
  {
    title: "Date Sent",
    align: "start",
    // sortable: false,
    key: "createdAt",
  },
]);
const itemPerPage = ref(10);
</script>

<template>
  <v-img class="px-5">
    <h6 class="header">Inbox</h6>

    <v-row>
      <v-col cols="12" md="10" sm="10" lg="10">
        <v-data-table
          v-model:items-per-page="itemPerPage"
          :headers="headers"
          :items="inbox"
          hover
          :loading="userStore.inbox === ''"
          class="elevation-2 w3-border content"
        >
          <template v-slot:item="{ item, index }">
            <tr>
              <td>
                <span class="table-content">{{ index + 1 }} </span>
              </td>
              <td>
                <div>
                  <span class="table-content">{{ item.columns.Books.title }}</span>
                </div>
              </td>
              <td>
                <div>
                  <span class="table-content">{{ item.columns.subject }}</span>
                </div>
              </td>
              <td>
                <div>
                  <span class="table-content">{{
                    item.columns.message
                  }}</span>
                </div>
              </td>
             
              <td>
                <div>
                  <span class="table-content">{{
                    dateFormatter(item.columns.createdAt)
                  }}</span>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-img>
</template>

<style scoped>
.content {
  color: #000 !important;
  font-family: Inter !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 1.9 !important; /* 33.1px */
  padding: 10px !important;
}
.table-header {
  font-weight: 700 !important;
  font-size: 12px;
  line-height: 17px;

  color: #1D2939;
}

.table-content {
  font-size: 11px;
  padding:3px!important;
  line-height: 17px;
  color: #1D2939;
  font-weight: 500;
  text-transform: capitalize !important;

}
</style>
