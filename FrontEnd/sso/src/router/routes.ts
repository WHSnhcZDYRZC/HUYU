
const routes = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        name: "login",
        path: "/login",
        component: () => import('@components/Login/Login.vue'),
    },

];

export default routes