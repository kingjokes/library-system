<script setup>
import { toastMessage } from "@/hooks/toasters";
import { AdminStore } from "@/store/adminStore";
import { computed, onMounted, ref } from "vue";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { appURL } from "@/hooks/queryHandler";

const adminStore = AdminStore();
const books = computed(() => adminStore.books || []);

const headers = [
  { title: "ID", key: "id" },
  { title: "Image", key: "image" },
  { title: "Title", key: "title" },
  { title: "Author", key: "author" },
  { title: "Category", key: "category" },
  { title: "ISBN", key: "isbn" },

  { title: "Publisher", key: "publisher" },
  { title: "Actions", key: "actions" },
];

const title = ref("");
const isbn = ref("");
const category = ref("");
const author = ref("");
const description = ref("");
const published_date = ref("");
const publisher = ref("");
const image = ref("");

const itemsPerPage = ref(10);
const deleteDialog = ref(false);
const editDialog = ref(false);
const deleteID = ref("");
const deleteLoading = ref(false);
const addLoading = ref(false);
const editContent = ref({});
const addDialog = ref(false);
const addForm = ref(null);
const deleteBook = async () => {
  deleteLoading.value = true;
  await adminStore
    .deleteBook({
      id: deleteID.value,
    })
    .then((response) => response.data)
    .then((response) => {
      deleteLoading.value = false;
      toastMessage(response.status ? "success" : "error", response.message);
      if (response.status) {
        adminStore.fetchBooks();
        deleteDialog.value = false;
      }
    })
    .catch((e) => {
      toastMessage("error", e.message);
      deleteLoading.value = false;
    });
};

const addBook = async () => {
  const { valid } = await addForm.value.validate();
  if (valid) {
    addLoading.value = true;
    await adminStore
      .addBook({
        title: title.value,
        isbn: isbn.value,
        category: category.value,
        author: author.value,
        description: description.value,
        published_date: published_date.value,
        publisher: publisher.value,
        image: image.value[0],
      })
      .then((response) => response.data)
      .then((response) => {
        addLoading.value = false;
        toastMessage(response.status ? "success" : "error", response.message);
        if (response.status) {
          adminStore.fetchBooks();
          addForm.value.reset();
          addDialog.value = false;
        }
      })
      .catch((e) => {
        toastMessage("error", e.message);
        addLoading.value = false;
      });
  }
};

const editBook = async () => {
  const { valid } = await addForm.value.validate();
  if (valid) {
    addLoading.value = true;
    await adminStore
      .updateBook({
        ...editContent.value,
      })
      .then((response) => response.data)
      .then((response) => {
        addLoading.value = false;
        toastMessage(response.status ? "success" : "error", response.message);
        if (response.status) {
          adminStore.fetchBooks();
          addForm.value.reset();
          editDialog.value = false;
        }
      })
      .catch((e) => {
        toastMessage("error", e.message);
        addLoading.value = false;
      });
  }
};

onMounted(() => {
  adminStore.fetchBooks();
});
</script>

<template>
  <v-img class="px-5">
    <div class="d-flex flex-row">
      <h5>Library</h5>
      <v-spacer></v-spacer>
      <v-btn
        @click="addDialog = true"
        class="text-capitalize"
        color="primary"
        flat
      >
        <span>Add New Book</span>
      </v-btn>
    </div>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="books"
      hover
      :loading="adminStore.books === ''"
      class="elevation-2 w3-border content"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <span class="table-content">{{ index + 1 }} </span>
          </td>
          <td>
            <div>
              <img
                class="w3-image"
                :src="`${appURL}${item.columns?.image}`"
                style="height:50px; width:50px"
              />
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{ item.columns?.title }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{ item.columns?.author }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{ item.columns.category }} </span>
            </div>
          </td>
          <td>
            <div>
              <span class="table-content">{{ item.columns?.isbn }}</span>
            </div>
          </td>

          <td>
            <div>
              <span class="table-content">{{ item.columns?.publisher }}</span>
            </div>
          </td>

          <td>
            <div class="table-content d-flex flex-row">
              <v-btn
                @click="
                  editContent = item.columns;
                  editDialog = true;
                "
                title="edit book"
                icon
                flat
                density="compact"
                class="mr-3"
              >
                <v-icon color="success" size="16">mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                @click="
                  deleteDialog = true;
                  deleteID = item.columns.id;
                "
                title="delete book"
                icon
                flat
                density="compact"
              >
                <v-icon color="error" size="16">mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-img>

  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card>
      <v-card-title class="w3-border-bottom">
        <h5>Delete Book</h5>
      </v-card-title>
      <v-card-text class="px-4 py-5">
        <p>Are you sure you want to delete book?</p>
        <br />
        <br />
        <div class="d-flex flex-row justify-center">
          <v-btn
            :loading="deleteLoading"
            @click="deleteBook"
            color="error"
            flat
            class="text-capitalize mr-4"
          >
            Yes
          </v-btn>

          <v-btn
            @click="deleteDialog = false"
            color="success"
            flat
            class="text-capitalize"
          >
            No
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="addDialog" max-width="600">
    <v-card>
      <v-card-title class="w3-border-bottom">Add New Book</v-card-title>
      <v-card-text class="px-5 py-6">
        <v-form ref="addForm" @submit.prevent="addBook">
          <v-file-input
            v-model="image"
            variant="outlined"
            class="mb-2"
            placeholder="Select Book Image"
            :rules="[() => !!image || 'Required']"
            show-size
            prepend-icon=""
            clearable
            density="compact"
            label="Book Image"
          />

          <v-text-field
            density="compact"
            label="Title"
            variant="outlined"
            v-model="title"
            class="mb-2"
            placeholder="Enter Book name"
            :rules="[() => !!title || 'Required']"
          ></v-text-field>
          <v-text-field
            density="compact"
            label="ISBN"
            type="number"
            variant="outlined"
            placeholder="Enter Book ISBN"
            v-model="isbn"
            class="mb-2"
            :rules="[() => !!isbn || 'Required']"
          ></v-text-field>
          <v-textarea
            rows="4"
            density="compact"
            label="Description"
            variant="outlined"
            no-resize
            class="mb-2"
            v-model="description"
            placeholder="Enter Book description"
            :rules="[() => !!description || 'Required']"
          ></v-textarea>
          <v-select
            density="compact"
            label="Category"
            class="mb-2"
            variant="outlined"
            v-model="category"
            :items="['Computer', 'Physiology', 'Medicine', 'Art']"
            placeholder="Select book category"
            :rules="[() => !!category || 'Required']"
          ></v-select>
          <v-text-field
            density="compact"
            label="Author"
            class="mb-2"
            v-model="author"
            variant="outlined"
            placeholder="Enter Book Author"
            :rules="[() => !!author || 'Required']"
          ></v-text-field>
          <v-text-field
            density="compact"
            label="Publisher"
            class="mb-2"
            variant="outlined"
            v-model="publisher"
            placeholder="Enter Book publisher"
            :rules="[() => !!publisher || 'Required']"
          ></v-text-field>

          <v-text-field
            density="compact"
            type="date"
            class="mb-2"
            label="Publisher Date"
            variant="outlined"
            v-model="published_date"
            placeholder="Enter Book publisher date"
            :rules="[() => !!published_date || 'Required']"
          ></v-text-field>
          <br />
          <div class="text-center">
            <v-btn
              :loading="addLoading"
              flat
              width="200"
              color="#000"
              type="submit"
              class="text-capitalize text-white"
            >
              Add Book
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="editDialog" max-width="600">
    <v-card>
      <v-card-title class="w3-border-bottom">Edit Book</v-card-title>
      <v-card-text class="px-5 py-6">
        <v-form ref="addForm" @submit.prevent="editBook">
          <v-text-field
            density="compact"
            label="Title"
            variant="outlined"
            v-model="editContent.title"
            class="mb-2"
            placeholder="Enter Book name"
            :rules="[() => !!editContent.title || 'Required']"
          ></v-text-field>
          <v-text-field
            density="compact"
            label="ISBN"
            type="number"
            variant="outlined"
            placeholder="Enter Book ISBN"
            v-model="editContent.isbn"
            class="mb-2"
            :rules="[() => !!editContent.isbn || 'Required']"
          ></v-text-field>
          <v-textarea
            rows="4"
            density="compact"
            label="Description"
            variant="outlined"
            no-resize
            class="mb-2"
            v-model="editContent.description"
            placeholder="Enter Book description"
            :rules="[() => !!editContent.description || 'Required']"
          ></v-textarea>
          <v-select
            density="compact"
            label="Category"
            class="mb-2"
            variant="outlined"
            v-model="editContent.category"
            :items="['Computer', 'Physiology', 'Medicine', 'Art']"
            placeholder="Select book category"
            :rules="[() => !!editContent.category || 'Required']"
          ></v-select>
          <v-text-field
            density="compact"
            label="Author"
            class="mb-2"
            v-model="editContent.author"
            variant="outlined"
            placeholder="Enter Book Author"
            :rules="[() => !!editContent.author || 'Required']"
          ></v-text-field>
          <v-text-field
            density="compact"
            label="Publisher"
            class="mb-2"
            variant="outlined"
            v-model="editContent.publisher"
            placeholder="Enter Book publisher"
            :rules="[() => !!editContent.publisher || 'Required']"
          ></v-text-field>

          <v-text-field
            density="compact"
            type="date"
            class="mb-2"
            label="Publisher Date"
            variant="outlined"
            v-model="editContent.published_date"
            placeholder="Enter Book publisher date"
            :rules="[() => !!editContent.published_date || 'Required']"
          ></v-text-field>
          <br />
          <div class="text-center">
            <v-btn
              :loading="addLoading"
              flat
              width="200"
              color="#000"
              type="submit"
              class="text-capitalize text-white"
            >
              Edit Book
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
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
