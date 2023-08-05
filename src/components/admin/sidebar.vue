<script setup>
import Logo from "@/assets/img/oau.png";
import { AdminStore }  from '@/store/adminStore'
import { useRouter } from "vue-router";
const routes = [
  { title: "Dashboard", route: "adminDashboard", icon: "mdi-view-dashboard" },
  { title: "Library", route: "adminLibrary", icon: "mdi-bookshelf" },
  {
    title: "Book Requests",
    route: "adminBorrowedBooks",
    icon: "mdi-book-check-outline",
  },
  { title: "Overdue Books", route: "adminOverdueBooks", icon: "mdi-alarm-multiple" },
  
  { title: "User", route: "adminUsers", icon: "mdi-account" },
  { title: "Inbox", route: "adminInbox", icon: "mdi-inbox" },
  { title: "Settings", route: "adminSettings", icon: "mdi-cog-outline" },

  // {title:'', route:'', icon:'',},
];
const adminStore = AdminStore();
const router = useRouter();

const Logout = async () => {
  await adminStore.$reset();
  await localStorage.clear();
  router.push({ name: "adminLogin" });
};
</script>

<template>
  <v-navigation-drawer border="0" color="#F0F0F0">
    <br />
    <br />
    <div class="text-center">
      <v-img :src="Logo" max-height="100" />
    </div>
    <v-list class="px-2">
      <v-list-item
        exact
        class="inactive mb-3"
        :active-class="'active'"
        :to="{ name: item.route }"
        link
        v-for="(item, index) in routes"
        :key="index"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>
          <span>{{ item.title }}</span>
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="Logout"
        exact
        class="inactive mb-3"
        :active-class="'active'"
        link
      >
        <template v-slot:prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
        <v-list-item-title>
          <span> Logout</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="text-center py-10">
        <div class="d-flex flex-row px-3">
          <div>
            <v-avatar>
              <v-icon size="39">mdi-account-circle-outline</v-icon>
            </v-avatar>
          </div>
          <div class="text-left ml-3">
            <span class="student-name"
              >{{ adminStore.admin?.lastname }} {{ adminStore.admin?.firstname }}
            </span>
            <br />
            <span class="user-mode text-capitalize">{{
              'Admin'
            }}</span>
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.active {
  border-radius: 15px !important;
  background: #000 !important;
  color: white !important;
  font-size: 13px !important;
}
.inactive {
  border-radius: 15px;
  background: #fff;
  color: #000;
  font-size: 13px !important;
}
.student-name {
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.user-mode {
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
