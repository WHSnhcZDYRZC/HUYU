import styled from './Core.less';
import Editor from '@/components/Editor/Editor';
import { SettingsContext, useSettings } from '@/components/Editor/context/SettingsContext';
import { Utils } from '@/utils';
import HistoryStorage from '@/utils/HistoryStorage';
import { Skeleton } from 'antd';
import { memo, useEffect, useRef, useState } from 'react';
import activeStore from '@/store';
import { saveOrUpdate } from '@/api/active';

export interface articleSaveParams {
    id: string
    title: string
    userId: string
    userName: string
    articleContent: string
    routerPath: string
}

const Core: React.FC = () => {
    const articleContent = activeStore((state: any) => state.articleContent)
    const articleTitle = activeStore((state: any) => state.articleTitle)


    const setActiveRouter = Utils.getUtils().setActiveRouter;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        activeRouterHandler(1);
        // setTimeout(() => setLoading(true), 1000)

        return () => {
            activeRouterHandler(0)
        }
    }, [])

    const activeRouterHandler = async (num) => {
        const activeRouter = Utils.getUtils().getActiveRouter()

        const user = HistoryStorage.getSessionItem("userInfo");

        console.log("activeRouter", num, activeRouter);

        if (!activeRouter.path) return;

        const params: articleSaveParams = {
            ...activeRouter,
            userId: user.id,
            userName: user.username,
            articleContent,
            title: activeRouter.label,
            routerPath: activeRouter.path
        }

        const { code, data } = await saveOrUpdate(params)
        if (code === 200) {
            data.title = articleTitle ? articleTitle : data.title;
            setActiveRouter(data);
        }
    }

    return (
        <div className={styled.Core}>
            {
                loading ?
                    // {/* <SettingsContext> */ }
                    < div className="editor-shell">
                        <Editor />
                    </div>
                    // {/* </SettingsContext> */ }
                    :
                    <Skeleton active={true} />
            }
        </div >

    );
}

export default Core;