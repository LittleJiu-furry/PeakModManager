import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "frame",
        component: () => import("./views/frame.vue"),
        children: [
            {
                path: "",
                name: "home",
                redirect: "/launch"
            },
            {
                path: "launch",
                name: "launch",
                component: () => import("./views/launch.vue")
            },
            {
                path: "store",
                name: "store",
                component: () => import("./views/store.vue"),
                children: [
                    {
                        path: "library",
                        name: "library",
                        component: () => import("./views/subPage/library.vue")
                    },
                    {
                        path: "download",
                        name: "download",
                        component: () => import("./views/subPage/download.vue")
                    }
                ]
            },
            {
                path: "settings",
                name: "settings",
                component: () => import("./views/settings.vue"),
                children: [
                    {
                        path: "manager",
                        name: "manager",
                        component: () => import("./views/subPage/managerSettings.vue")
                    },
                    {
                        path: "mod",
                        name: "mod",
                        component: () => import("./views/subPage/modSettings.vue")
                    }
                ]
            },
            {
                path: "more",
                name: "more",
                component: () => import("./views/more.vue"),
                children: [
                    {
                        path: "about",
                        name: "about",
                        component: () => import("./views/subPage/about.vue")
                    },
                    {
                        path: "feedback",
                        name: "feedback",
                        component: () => import("./views/subPage/feedback.vue")
                    },
                    {
                        path: "log",
                        name: "log",
                        component: () => import("./views/subPage/log.vue")
                    }
                ]
            }
        ]
    },
    {
        path: "/select-profile",
        name: "select-profile",
        component: () => import("./views/selectProfile.vue")
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes: routes
})