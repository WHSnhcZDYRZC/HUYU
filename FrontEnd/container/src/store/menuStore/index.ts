import { create } from 'zustand'

export interface MenuStateInf {
    collapsed: boolean
    breadcrumb: string
    setCollapsed: (is: boolean) => any
    setBreadcrumb: (str: string) => any
}

const useStore = create<MenuStateInf>((set) => ({
    collapsed: false,
    breadcrumb: "",

    setCollapsed: (is: boolean) => set(() => ({ collapsed: is })),

    setBreadcrumb: (str: string) => set(() => ({ breadcrumb: str }))
}))

export default useStore;