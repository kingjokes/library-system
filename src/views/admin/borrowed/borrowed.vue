<script setup>
import { computed, onMounted, ref } from "vue";
import { overdueChecker } from "@/hooks/dateFunctions";
import { VDataTable } from "vuetify/labs/VDataTable";
import { AdminStore } from "@/store/adminStore";
import { dateFormatter } from "@/hooks/dateFunctions";
import { toastMessage } from "@/hooks/toasters";
const adminStore = AdminStore();
const borrowedBooks = computed(() => adminStore.borrowedBooks || []);
onMounted(()=>{
    adminStore.fetchBorrowedBooks()
})
const headers = [
  { title: "ID", key: "id" },
  { title: "Member", key: "User" },
  { title: "Book", key: "Books" },
  { title: "Request Date", key: "request_date" },
  { title: "Due Date", key: "due_date" },
  { title: "Status", key: "status" },
  { title: "Days Remaining", key: "overdue" },
  { title: "Action", key: "action" },
];
const itemPerPage = ref(10);
const approveRequest = async (id, status,book_id) => {
  await adminStore
    .approveBookRequest({
      id,
      status,
      book_id
    })
    .then((response) => response.data)
    .then((response) => {
      toastMessage(response.status ? "success" : "error", response.message);
      if (response.status) {
        adminStore.fetchBorrowedBooks();
      }
    })
    .catch((e) => {
      toastMessage("error", e.message);
    });
};
</script>

<template>
  <div class="container">
    <h4>Overdue book list</h4>
    <v-data-table
      v-model:items-per-page="itemPerPage"
      :headers="headers"
      :items="borrowedBooks"
      hover
      :loading="adminStore.borrowedBooks === ''"
      class="elevation-2 w3-border content"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <span class="table-content">{{ index + 1 }} </span>
          </td>
          <td>
            <div>
              <span class="table-content"
                >{{ item.columns?.User?.firstname }}
                {{ item.columns?.User?.lastname }} ({{
                  item.columns.User.role
                }})</span
              >
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{
                item.columns?.Books?.title
              }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{
                dateFormatter(item.columns.request_date)
              }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{
                dateFormatter(item.columns.due_date)
              }}</span>
            </div>
          </td>
          <td>
            <div style="font-weight: 600">
              <p
                v-if="item.columns.status === 0"
                style="color: purple; font-size: 10px"
              >
                Pending
              </p>
              <p
                v-if="item.columns.status === 1"
                style="color: green; font-size: 10px"
              >
                Approved
              </p>
              <p
                v-if="item.columns.status === 2"
                style="color: blue; font-size: 10px"
              >
                Returned
              </p>
              <p
                v-if="item.columns.status === 3"
                style="color: brown; font-size: 10px"
              >
                Reserved
              </p>
              <p
                v-if="item.columns.status === 4"
                style="color: cyan; font-size: 10px"
              >
                Pending Return
              </p>
              <!-- <span class="table-content">{{ item.columns.status }}</span> -->
            </div>
          </td>

          <td>
            <div>
              <span
                class="table-content"
                style="text-transform: none !important"
                >{{ overdueChecker(item.columns.due_date) + " day(s)" }}</span
              >
            </div>
          </td>

          <td>
            <div>
              <v-btn
                @click="
                  approveRequest(
                    item.columns.id,
                    item.columns.status === 4 ? 2 : 1,
                    item.columns.Books.id
                  )
                "
                v-if="item.columns.status === 4 || item.columns.status === 0"
                :title="
                  item.columns.status === 4
                    ? 'Approve Return request'
                    : 'Approved Book Request'
                "
                flat=""
                density="compact"
                color="success"
                icon
              >
                <v-icon size="15">mdi-check</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.container {
  min-height: 200px;
  padding: 21px 17px 21px 13px;
  border-radius: 15px;
  background: white;
}
.table-header {
  font-weight: 700 !important;
  font-size: 12px;
  line-height: 17px;

  color: #1d2939;
}

.table-content {
  font-size: 11px;
  padding: 3px !important;
  line-height: 17px;
  color: #1d2939;
  font-weight: 500;
  text-transform: capitalize !important;
}
</style>
