// Utilities
import { basicGetRequest, basicPostRequest } from "@/hooks/queryHandler";
import { defineStore } from "pinia";

export const UserStore = defineStore("user", {
  state: () => ({
    token: "",
    user: "",
    books: "",
    borrowedBooks: "",
    inbox: "",
    bookDetails: "",
    borrowedBookDetails: "",
  }),
  actions: {
    async loginUser(payload) {
      return await basicPostRequest("login", payload, "");
    },
    async registerUser(payload) {
      return await basicPostRequest("register", payload, "");
    },
    async fetchUserDetails() {
      await basicGetRequest("/user-details", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.user = response.details;
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
      await basicGetRequest("/user-inbox", this.token)
        .then((response) => response.data)
        .then((response) => {
          if (response.status) this.inbox = response.data;
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
    async submitBookRequest(payload) {
      return await basicPostRequest("order-book", payload, this.token);
    },
    async returnBook(payload) {
      return await basicPostRequest("return-book", payload, this.token);
    },
  },
  persist: true,
});
