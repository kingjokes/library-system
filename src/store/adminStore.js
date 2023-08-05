import { CreateFormData } from "@/hooks/CreateFormData";
import { basicGetRequest, basicPostRequest } from "@/hooks/queryHandler";
import { defineStore } from "pinia";

export const AdminStore = defineStore("admin", {
  state: () => ({
    users: "",
    admin: "",
    token: "",
    books: "",
    bookDetails: "",
    borrowedBooks: "",
    borrowedBookDetails: "",
    inbox: "",
  }),
  actions: {
    async loginAdmin(payload) {
      return await basicPostRequest("login", payload, "");
    },
    async fetchAdminDetails() {
      await basicGetRequest("/admin-details", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.admin = response.details;
        });
    },
    async fetchBooks() {
      await basicGetRequest("/get-books", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.books = response.data;
        });
    },
    async fetchBorrowedBooks() {
      await basicGetRequest("/borrowed-books", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.borrowedBooks = response.data;
        });
    },
    async fetchInbox() {
      await basicGetRequest("/inbox", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.inbox = response.data;
        });
    },
    async fetchUsers() {
      await basicGetRequest("/get-users", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.users = response.data;
        });
    },
    async fetchBookDetails(id) {
      await basicGetRequest(`/book-details/${id}`, this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.bookDetails = response.details;
        });
    },
    async fetchBorrowedBookDetails(id) {
      await basicGetRequest(`/borrowed-book-details/${id}`, this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.borrowedBookDetails = response.details;
        });
    },
    async changePassword(payload) {
      return await basicPostRequest("change-password", payload, this.token);
    },
    async deleteBook(payload) {
      return await basicPostRequest("delete-book", payload, this.token);
    },
    async updateBook(payload) {
      return await basicPostRequest("update-book", payload, this.token);
    },
    async addBook(payload) {
        return await basicPostRequest("add-book", CreateFormData(payload), this.token);
      },
    async approveBookRequest(payload) {
      return await basicPostRequest(
        "approve-book-request",
        payload,
        this.token
      );
    },

    async sendMessage(payload) {
        return await basicPostRequest(
          "send-message",
          payload,
          this.token
        );
      },
  },
  persist: true,
});
