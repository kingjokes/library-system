export const AdminRoutes = [
  {
    name: "adminDashboard",
    path: "dashboard",
    component: () => import("@/views/admin/dashboard/dashboard.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminLibrary",
    path: "library",
    component: () => import("@/views/admin/library/library.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminBookDetails",
    path: "book-details/:id",
    component: () => import("@/views/admin/library/bookDetails.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminBorrowedBooks",
    path: "borrowed-books",
    component: () => import("@/views/admin/borrowed/borrowed.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminBorrowedBookDetails",
    path: "borrowed-book-details/:id",
    component: () => import("@/views/admin/borrowed/details.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminOverdueBooks",
    path: "overdue-books",
    component: () => import("@/views/admin/overdue/overdue.vue"),
    meta: {
      access: "admin",
    },
  },
  // {
  //   name: "overdueBookDetails",
  //   path: "overdue-book-details/:id",
  //   component: () => import("@/views/user/overdue/overdueDetails.vue"),
  // },
  {
    name: "adminSettings",
    path: "settings",
    component: () => import("@/views/admin/settings/settings.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminInbox",
    path: "inbox",
    component: () => import("@/views/admin/inbox/inbox.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "adminUsers",
    path: "users",
    component: () => import("@/views/admin/users/users.vue"),
    meta: {
      access: "admin",
    },
  },
  // {
  //   name: "books",
  //   path: "books",
  //   component: () => import("@/views/user/reserved/books.vue"),
  // },
  // {
  //   name: "reservedBookDetails",
  //   path: "reserved-book-details/:reqid/:book_id",
  //   component: () => import("@/views/user/reserved/reserved.vue"),
  // },
];
