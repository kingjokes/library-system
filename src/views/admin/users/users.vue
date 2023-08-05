<script setup>
import { UserStore } from "@/store/userStore";
import { VDataTable } from "vuetify/labs/VDataTable";
import { dateFormatter } from "@/hooks/dateFunctions";
import { computed, ref, onMounted } from "vue";
import { AdminStore } from "@/store/adminStore";
import { toastMessage } from "@/hooks/toasters";
const adminStore = AdminStore();

const users = computed(() => adminStore.users || []);

const headers = ref([
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Firstname",
    align: "start",
    // sortable: true,
    key: "firstname",
  },
  {
    title: "Lastname",
    align: "start",
    // sortable: true,
    key: "lastname",
  },
  {
    title: "Email",
    align: "start",
    // sortable: true,
    key: "email",
  },
  {
    title: "Role",
    align: "start",
    // sortable: false,
    key: "role",
  },
  {
    title: "Date Joined",
    align: "start",
    // sortable: false,
    key: "createdAt",
  },
]);
const itemPerPage = ref(10);

onMounted(() => {
  adminStore.fetchBooks();
  adminStore.fetchUsers();
});
</script>

<template>
  <v-img class="px-5">
    <v-row>
      <v-col cols="12" md="12" sm="12" lg="12">
        <div class="d-flex flex-row">
          <div>
            <h6 class="header">User</h6>
          </div>
        </div>
        <v-data-table
          v-model:items-per-page="itemPerPage"
          :headers="headers"
          :items="users"
          hover
          :loading="adminStore.inbox === ''"
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
                    >{{ item.columns.firstname }}
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <span class="table-content"
                    >{{ item.columns.lastname }}
                  </span>
                </div>
              </td>

              <td>
                <div>
                  <span class="table-content"
                    >{{ item.columns.email }}
                  </span>
                </div>
              </td>

              <td>
                <div>
                  <span class="table-content"
                    >{{ item.columns.role }}
                  </span>
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

  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Send new message</v-card-title>
      <v-card-text class="py-5 px-4">
        <v-form ref="messageForm" @submit.prevent="sendMessage">
          <v-autocomplete
            density="compact"
            label="Book"
            class="mb-2"
            variant="outlined"
            v-model="book_id"
            :items="books"
            item-value="id"
            item-title="title"
            placeholder="Select book"
            :rules="[() => !!book_id || 'Required']"
          ></v-autocomplete>
          <v-autocomplete
            density="compact"
            label="Member"
            class="mb-2"
            variant="outlined"
            v-model="user_id"
            :items="userList"
            item-value="id"
            item-title="fullname"
            placeholder="Select member"
            :rules="[() => !!user_id || 'Required']"
          ></v-autocomplete>
          <v-text-field
            density="compact"
            label="Subject"
            variant="outlined"
            v-model="subject"
            class="mb-2"
            placeholder="Enter Subject"
            :rules="[() => !!subject || 'Required']"
          ></v-text-field>

          <v-textarea
            rows="4"
            density="compact"
            label="Message"
            variant="outlined"
            no-resize
            class="mb-2"
            v-model="message"
            placeholder="Enter Message"
            :rules="[() => !!message || 'Required']"
          ></v-textarea>

          <div class="text-center">
            <v-btn
              :loading="loading"
              type="submit"
              color="#000"
              class="text-white text-capitalize"
              flat
            >
              <span>Send Message</span>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
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
