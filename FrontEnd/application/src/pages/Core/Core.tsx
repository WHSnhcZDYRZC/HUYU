import styled from './Core.less';
import Editor from '@/components/Editor/Editor';
import { findObjectByPath, Utils } from '@/utils';
import HistoryStorage from '@/utils/HistoryStorage';
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import activeStore from '@/store';
import { getArticleContent, saveOrUpdate } from '@/api/active';
import { defaultData } from '@/components/Editor/plugins/InitPlugin/InitData';
import LifeCycleHOC from '@/Hoc/LifeCycleHOC';
import { Dropdown, Skeleton, Button } from 'antd';

export interface articleSaveParams {
    id: string
    title: string
    userId: string
    userName: string
    articleContent: string
    routerPath: string
}

const Core = (_: any, ref: any) => {
    const { setActiveRouter } = Utils.getUtils();

    const _articleContent = activeStore((state: any) => state.articleContent)
    const setArticleContent = activeStore((state: any) => state.setArticleContent)
    // const articleTitle = activeStore((state: any) => state.articleTitle)
    let activeRouter = HistoryStorage.getSessionItem("ActiveRouter")
    const user = HistoryStorage.getSessionItem("userInfo");

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        initHandler();
    }, []);

    useImperativeHandle(ref, () => ({
        componentWillUnmount() {
            activeRouterSaveHandler(0)
        },
    }));

    const articleContent = useRef("");
    useEffect(() => {
        articleContent.current = _articleContent;
    }, [_articleContent])

    const activeRouterSaveHandler = async (num: number) => {
        if (!HistoryStorage.getSessionItem("ActiveRouter").path) return;

        setLoading(true)
        try {
            const imageList = document.querySelector(".ContentEditable__root")?.querySelectorAll("img");

            console.log("data2", articleContent);

            const params: articleSaveParams = {
                ...activeRouter,
                userId: user.id,
                userName: user.username,
                articleContent: articleContent.current || defaultData(),
                title: activeRouter.label || activeRouter.title,
                routerPath: activeRouter.path,
                imagesUrl: imageList?.length ? [...imageList].map(v => v.src) : null
            }

            const { data } = await saveOrUpdate(params)

            activeRouter = {
                ...activeRouter,
                id: data.id,
                key: data.id,
                label: data.title,
                path: data.routerPath
            }

            if (!params.id) {
                HistoryStorage.setSessionItem("ActiveRouter", activeRouter);
            }

            if (!num) {
                setArticleContent("");
            }

            setActiveRouter();
        } catch (error) {
            console.log("core error:", error);

        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    const getArticleContentHandler = async () => {
        setLoading(true)

        try {
            const { code, data } = await getArticleContent(activeRouter.id)

            if (code === 200) {
                Promise.resolve().then(() => {
                    setTimeout(() => {
                        setArticleContent(data.articleContent)
                    }, 50);
                })
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

export default LifeCycleHOC(forwardRef(Core));