import { defaultData } from '@/components/Editor/plugins/InitPlugin/InitData';
import { create } from 'zustand'

export interface articleInf {
    articleContent: string
    articleTitle: string
    setArticleContent: (str: string) => void
    setArticleTitle: (str: string) => void
}

const articleStore = create<articleInf>((set) => ({
    articleTitle: document.title,
    articleContent: "",
    setArticleContent: (articleContent) => {
        // console.log("articleContent 123", articleContent);

        set(() => ({ articleContent }))
    },
    setArticleTitle: (articleTitle) => {
        set({ articleTitle })
    }
}))

export default articleStore;