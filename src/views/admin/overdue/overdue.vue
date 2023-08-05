<script setup>
import { computed, ref } from "vue";
import { overdueChecker } from "@/hooks/dateFunctions";
import { VDataTable } from "vuetify/labs/VDataTable";
import { AdminStore } from "@/store/adminStore";
const adminStore = AdminStore();
const borrowedBooks = computed(() => adminStore.borrowedBooks || []);
const overdue = computed(() =>
  borrowedBooks.value.filter(
    (item) => item.status === 1 && overdueChecker(item.due_date) >= 1
  )
);
const headers=[
    {title:'ID', key:'id'},
    {title:'Member', key:'User'},
    {title:'Book', key:'Books'},
    {title:'Overdue', key:'due_date'},
]
const itemPerPage=ref(10)
</script>

<template>

  <div class="container">
    <h4>Overdue book list</h4>
    <v-data-table
          v-model:items-per-page="itemPerPage"
          :headers="headers"
          :items="overdue"
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
                  <span class="table-content">{{ item.columns?.User?.firstname }} {{ item.columns?.User?.lastname }}</span>
                </div>
              </td>
              <td>
                <div>
                  <span class="table-content">{{ item.columns?.Books?.title }}</span>
                </div>
              </td>
              
             
              <td>
                <div>
                  <span class="table-content" style="text-transform: none!important;">{{
                    overdueChecker(item.columns.due_date) +' day(s)'
                  }}</span>
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
  background: #f0f0f0;
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
