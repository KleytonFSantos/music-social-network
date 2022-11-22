import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AccountView from "@/views/AccountView.vue";
import ProfileSection from "@/views/account/ProfileSection.vue";
import EditProfile from "@/views/account/EditProfile.vue";
import AddSong from "@/views/account/AddSong.vue";
import DeleteSong from "@/views/account/DeleteSong.vue";
import { authService } from "@/services/authService";
import AddYoutubeVideo from "@/views/account/AddYoutubeVideo.vue";
import DeleteYoutubeVideo from "@/views/account/DeleteYoutubeVideo.vue";
import EditPost from "@/views/account/EditPost.vue";
import CreatePost from "@/views/account/CreatePost.vue";
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
        path: "profile/:user_id",
        name: "profile",
        component: ProfileSection,
      },
      {
        path: "edit-profile/:user_id",
        name: "EditProfile",
        component: EditProfile,
      },
      {
        path: ":user_id/add-song",
        name: "AddSong",
        component: AddSong,
      },
      {
        path: ":user_id/delete-song",
        name: "DeleteSong",
        component: DeleteSong,
      },
      {
        path: ":user_id/add-youtube-video",
        name: "AddYouTubeVideo",
        component: AddYoutubeVideo,
      },
      {
        path: ":user_id/delete-youtube-video",
        name: "DeleteYouTubeVideo",
        component: DeleteYoutubeVideo,
      },
      {
        path: ":user_id/create-post",
        name: "CreatePost",
        component: CreatePost,
      },
      {
        path: ":user_id/edit-post/:post_id",
        name: "EditPost",
        component: EditPost,
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
