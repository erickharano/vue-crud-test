import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/home",
        name: "Home",
        component: () => import("./components/Home")
    },
    {
        path: "/",
        alias: "/peoples",
        name: "people-list",
        component: () => import("./components/People/PeopleList")
    },
    {
        path: "/",
        alias: "/peoples/:id",
        name: "people-edit",
        component: () => import("./components/People/People")
    },
    {
        path: "/",
        alias: "/peoples/add",
        name: "people-create",
        component: () => import("./components/People/People")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
