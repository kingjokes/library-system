// Composables
import { createRouter, createWebHistory } from "vue-router";
import { UserRoutes } from "./userRoutes";
import { AdminRoutes } from "./adminRoutes";

const routes = [
  {
    path: "/",
    component: () => import("@/views/guest/login.vue"),
    name: "login",
    meta:{
      access:'guest'
    }
  },
  {
    path:'/login',
 
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/' }
    },

  },
  {
    path: "/register",
    component: () => import("@/views/guest/register.vue"),
    name: "register",
    meta:{
      access:'guest'
    }
  },
  {
    path:'/user/',
    name:'user',
    component:()=>import('@/views/user/index.vue'),
    children:[
      ...UserRoutes
    ]
  },
  {
    path: "/admin/login",
    component: () => import("@/views/admin/login.vue"),
    name: "adminLogin",
    access: "guest",
  },
  {
    path:'/admin/',
    name:'admin',
    component:()=>import('@/views/admin/index.vue'),
    children:[
      
      ...AdminRoutes
    ]
  },
  //not found
  {
    name:'notFound',
    path: "/:catchAll(.*)",
    component:()=>import("@/views/error/notFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
