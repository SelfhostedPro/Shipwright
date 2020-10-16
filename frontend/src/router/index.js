import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import home from "../components/main/home.vue"
import builder from "../components/builder/builder.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: home
      },
      {
        path: "builder",
        component: builder,
        name: "builder"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
