import animation from '@/utils/animation'
import { create } from 'zustand'

export interface FullLoadingStateInf {
    userInfo: any,
    isFullLoadingShow: boolean
    setFullLoadingShow: (is: boolean) => any
    setUserInfo: (userInfo: any) => any
}

const useFullLoading = create<FullLoadingStateInf>((set) => ({
    isFullLoadingShow: true,
    userInfo: {},

    setUserInfo: (userInfo) => {
        set({ userInfo })
    },
    
    setFullLoadingShow: (v) => {
        const dom: any = document.querySelector("#full-loading")
        animation(dom, "animate__fadeOut", 1, () => {
            set({ isFullLoadingShow: v })
        })
    }
}))

export default useFullLoading;