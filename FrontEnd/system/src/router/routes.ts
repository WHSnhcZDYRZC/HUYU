
const routes = [
    {
        path: '/',
        redirect: '/systemManagement',
    },
    {
        name: "systemManagement",
        path: "/systemManagement",
        component: () => import('@/pages/SystemManagement/index.vue')
    },
    {
        name: 'userManagement',
        path: '/userManagement',
        component: () => import('@/pages/UserManagement/index.vue')
    },
];

export default routes