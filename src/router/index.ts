import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AccountView from "@/views/AccountView.vue";
import ProfileSection from "@/views/account/ProfileSection.vue";
import EditProfile from "@/views/account/EditProfile.vue";
import { authService } from "@/services/authService";

let isUserLoggedIn = false;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/account",
    component: AccountView,
    meta: {
      needsAuth: true,
    },
    children: [
      {
        path: "profile",
        name: "profile",
        component: ProfileSection,
      },
      {
        path: "edit-profile",
        name: "EditProfile",
        component: EditProfile,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to:  RouteLocationNormalized, 
    from: RouteLocationNormalized, 
    next: NavigationGuardNext
  ) => {
  if (to.meta.needsAuth) {
    authService.auth(
      () => {
        isUserLoggedIn = true;
        if (isUserLoggedIn) {
          next();
        }
      },
      () => {
        next("/login");
      }
    );
  } else {
    next();
  }
});

export default router;
