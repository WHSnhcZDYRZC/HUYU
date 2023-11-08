import animation from "@/utils/animation";
import { $, convertData, findObjectByPath } from '@/utils'
import { create } from 'zustand'
import { history } from 'umi';

export interface MenuItemInf {
    children?: MenuItemInf[],
    label: string,
    key: string | number,
    path: string,
    id: string | number,
    icon?: any,
    [key: string]: any
}

// const pageRouters: MenuItemInf[] = [
//     {
//         label: "Java",
//         key: "Java1",
//         id: "1023",
//         path: "/application/1023"
//     },
//     {
//         label: "Js",
//         key: "Js1",
//         id: "1024",
//         path: "/application/1024",
//         isOpen: false,
//         children: [
//             {
//                 label: "JavaScript 是什么",
//                 key: "Js2",
//                 id: "1025",
//                 path: "/application/1024/1025"
//             },
//             {
//                 label: "JavaScript 是什么2",
//                 key: "Js3",
//                 id: "1026",
//                 path: "/application/1024/1026"
//             }
//         ]
//     }
// ]

export interface MenuStateInf {
    activeRouter: MenuItemInf | any
    collapsed: boolean
    breadcrumb: string
    pageRouters: MenuItemInf[]
    // expandPageRouterMap: any,
    setCollapsed: (is: boolean) => any
    setBreadcrumb: (str: string) => any
    setPageRouters: (arr: MenuItemInf[]) => any
    // setExpandPageRouterMap: (arr: MenuItemInf[]) => any
    setActiveRouter: (obj: MenuItemInf) => any
}

const useStore = create<MenuStateInf>((set) => ({
    collapsed: window.innerWidth > 1200 ? false : true,
    breadcrumb: "",
    pageRouters: [],
    activeRouter: {},
    // expandPageRouterMap: convertData(pageRouters),

    // setExpandPageRouterMap: (pageRouters) => {
    //     set({
    //         expandPageRouterMap: convertData(pageRouters)
    //     })
    // },

    setActiveRouter: (activeRouter) => {
        set({
            activeRouter,
        })
    },

    setPageRouters: (pageRouters) => {
        set((state) => {
            // state.setExpandPageRouterMap(pageRouters)

            return {
                pageRouters,
            }
        })
    },

    setCollapsed: async (is: boolean) => {
        const menu: HTMLElement | any = $("#rootMenu");

        if (is) {
            await animation(menu, "animate__backOutLeft", 0.5)
        }

        set({ collapsed: is })
    },

    setBreadcrumb: (str: string) => set((state) => {
        document.title = str || "HuYu 笔记";
        return { breadcrumb: str }
    })
}))

export default useStore;