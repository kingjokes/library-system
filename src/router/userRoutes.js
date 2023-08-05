export const UserRoutes = [
  {
    name: "dashboard",
    path: "dashboard",
    component: () => import("@/views/user/dashboard/dashboard.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "library",
    path: "library",
    component: () => import("@/views/user/library/library.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "bookDetails",
    path: "book-details/:id",
    component: () => import("@/views/user/library/bookDetails.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "borrowedBooks",
    path: "borrowed-books",
    component: () => import("@/views/user/borrowed/borrowed.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "borrowedBookDetails",
    path: "borrowed-book-details/:id",
    component: () => import("@/views/user/borrowed/details.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "overdueBooks",
    path: "overdue-books",
    component: () => import("@/views/user/overdue/overdue.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "overdueBookDetails",
    path: "overdue-book-details/:id",
    component: () => import("@/views/user/overdue/overdueDetails.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "settings",
    path: "settings",
    component: () => import("@/views/user/settings/settings.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "inbox",
    path: "inbox",
    component: () => import("@/views/user/inbox/inbox.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "reservedBooks",
    path: "reserved-books",
    component: () => import("@/views/user/reserved/books.vue"),
    meta:{
      access:'user'
    }
  },
  {
    name: "reservedBookDetails",
    path: "reserved-book-details/:reqid/:book_id",
    component: () => import("@/views/user/reserved/reserved.vue"),
    meta:{
      access:'user'
    }
  },
];
