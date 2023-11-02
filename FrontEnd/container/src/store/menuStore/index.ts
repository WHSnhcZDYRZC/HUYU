import animation from "@/utils/animation";
import { $ } from '@/utils'
import { create } from 'zustand'

export interface MenuStateInf {
    collapsed: boolean
    breadcrumb: string
    setCollapsed: (is: boolean) => any
    setBreadcrumb: (str: string) => any
}

const useStore = create<MenuStateInf>((set) => ({
    collapsed: window.innerWidth > 1200 ? false : true,
    breadcrumb: "",

    setCollapsed: async (is: boolean) => {
        const menu: HTMLElement | any = $("#rootMenu");

        if (is) {
            await animation(menu, "animate__backOutLeft", 0.5)
        }

        set({ collapsed: is })
    },

    setBreadcrumb: (str: string) => set(() => {
        document.title = str || "HuYu 笔记";

        return { breadcrumb: str }
    })
}))

export default useStore;