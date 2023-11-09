import styled from './Core.less';
import Editor from '@/components/Editor/Editor';
import { SettingsContext, useSettings } from '@/components/Editor/context/SettingsContext';
import { Utils } from '@/utils';
import HistoryStorage from '@/utils/HistoryStorage';
import { Skeleton } from 'antd';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import activeStore from '@/store';
import { getArticleContent, saveOrUpdate } from '@/api/active';
import { defaultData } from '@/components/Editor/plugins/InitPlugin/InitData';

export interface articleSaveParams {
    id: string
    title: string
    userId: string
    userName: string
    articleContent: string
    routerPath: string
}

const Core: React.FC = () => {
    const { setActiveRouter } = Utils.getUtils()
    const _articleContent = activeStore((state: any) => state.articleContent)
    const setArticleContent = activeStore((state: any) => state.setArticleContent)
    // const articleTitle = activeStore((state: any) => state.articleTitle)
    let activeRouter = HistoryStorage.getSessionItem("ActiveRouter")
    const user = HistoryStorage.getSessionItem("userInfo");

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        initHandler();

        return () => {
            activeRouterSaveHandler(0)
        }
    }, [])

    const articleContent = useRef("");
    useEffect(() => {
        articleContent.current = _articleContent;
    }, [_articleContent])

    const activeRouterSaveHandler = async (num: number) => {
        if (!activeRouter.path) return;

        setLoading(true)
        try {
            const params: articleSaveParams = {
                ...activeRouter,
                userId: user.id,
                userName: user.username,
                articleContent: articleContent.current || defaultData(),
                title: activeRouter.label,
                routerPath: activeRouter.path
            }

            const { code, data } = await saveOrUpdate(params)
            if (code === 200) {
                activeRouter = {
                    ...activeRouter,
                    id: data.id,
                    key: data.id
                }
                
                if (!params.id) {
                    HistoryStorage.setSessionItem("ActiveRouter", activeRouter);
                }
                if (num) {
                    setArticleContent(data.articleContent)
                }
                setActiveRouter();
            }
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    const getArticleContentHandler = async () => {
        setLoading(true)

        try {
            const { code, data } = await getArticleContent(activeRouter.id)

            if (code === 200) {
                setArticleContent(data.articleContent)
            }
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    const initHandler = () => {
        if (activeRouter.id) {
            getArticleContentHandler();
        } else {
            activeRouterSaveHandler(1);
        }
    }

    return (
        <div className={styled.Core}>
            {
                loading ?
                    <Skeleton active={true} />
                    :
                    // {/* <SettingsContext> */ }
                    < div className="editor-shell">
                        <Editor />
                    </div>
                // {/* </SettingsContext> */ }
            }
        </div >

    );
}

export default Core;