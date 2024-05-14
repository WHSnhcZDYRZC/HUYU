import { FileWordOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styled from './Tools.less'
import BasalDialog from '@/components/BasalDialog/BasalDialog';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Card, Input } from 'antd';
import { searchArticleMenu } from '@/api/active';
import { history } from 'umi';
import HistoryStorage from '@/utils/HistoryStorage';

interface ToolsInf {
    addPageRouterHandler: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Tools = (props: ToolsInf) => {
    const { addPageRouterHandler } = props;

    const searchDialogRef = useRef<any>();
    const { Search } = Input;

    const timer = useRef<any>();
    const [searchItem, setSearchItem] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const inputChange = useCallback((e: any) => {
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(async () => {
            const { code, data }: any = await searchArticleMenu({
                keyWord: e.target.value
            });

            if (code === 200) {
                setSearchItem(data);
            }
        }, 100)
    }, []);

    console.log("searchItem", searchItem);

    const cards = useMemo(() => {

        return searchItem.map((item: any) => {
            return (
                <Card
                    key={item.id}
                    className={styled["search-card"]}
                    onClick={() => {
                        HistoryStorage.setSessionItem("ActiveRouter", item);
                        history.push(item.path);
                        searchDialogRef.current.setOpen(false);
                    }}
                >
                    <div style={{
                        display: 'flex',
                    }}>
                        <FileWordOutlined style={{
                            width: "50px",
                            height: "50px",
                        }} />

                        <div>
                            <p>位置：{item.path}</p>
                            <p>{item.title}</p>
                        </div>
                    </div>
                </Card>
            )
        })

    }, [searchItem])

    return (
        <div className={styled.tools}>
            <SearchOutlined onClick={() => searchDialogRef.current.setOpen(true)} />
            <PlusOutlined onClick={(e) => addPageRouterHandler(e)} />
            <BasalDialog
                destroyOnClose={true}
                ref={searchDialogRef}
                width={800}
                footer={<></>}
                onCancel={() => {
                    searchDialogRef.current.setOpen(false)
                }}
            >
                <Search size="large" placeholder="标题或内容..." onChange={inputChange} loading={loading} />

                <div
                    style={{
                        maxHeight: "564px",
                        overflow: "auto"
                    }}

                    className='search-content-box'
                >
                    {cards}
                </div>
            </BasalDialog>
        </div>
    )
}

export default Tools;