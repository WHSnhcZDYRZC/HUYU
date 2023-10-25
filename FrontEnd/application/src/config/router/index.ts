export default [
    { path: "/", redirect: '/home' },
    { path: "/home", component: "@/pages/Index/Index.tsx" },
    { path: "/:id/*", component: "@/pages/Core/Core.tsx" },
];
