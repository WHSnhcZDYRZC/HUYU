import { create } from 'zustand'

export interface MenuStateInf {
    collapsed: boolean
    breadcrumb: string
}

const useStore = create((set) => ({
    collapsed: false,
    breadcrumb: "",

    setCollapsed: (is: boolean) => set(() => {
        return {
            collapsed: is
        }
    }),

    setBreadcrumb: (str: string) => set(() => ({ breadcrumb: str }))
}))

export default useStore;