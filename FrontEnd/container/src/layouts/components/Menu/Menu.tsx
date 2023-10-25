import { FileWordOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styled from './Menu.less';
import router from '@/config/router';
import { history } from 'umi';
import { useEffect, useMemo, useState } from 'react';
import useMenuStore, { MenuStateInf } from '@/store/menuStore';

const pageData = [
    {
        label: "Java",
        key: "Java1",
        id: "1023"
    },
    {
        label: "Js",
        key: "Js1",
        id: "1024",
        children: [
            {
                label: "JavaScript 是什么",
                key: "Js2",
                id: "1025",
            },
            {
                label: "JavaScript 是什么2",
                key: "Js3",
                id: "1026",
            }
        ]
    }
]

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

// 临时代码
const necessityRouter = router.filter((v) => (v.name && v.name != "文章中心"))

const articleRouter = router.find(v => v.name === '文章中心');

const activeRouter = router.find(v => v.path === history.location.pathname)

const items: MenuProps['items'] = [
    getItem(null, 'grp', null,
        necessityRouter.map((v, i: number) => i ? getItem(v.name, v.path, <SettingOutlined />) : getItem(v.name, v.path, <HomeOutlined />)),
        'group'),

    { type: 'divider' },

    ...pageData.map(v => {
        if (v.children?.length) {
            return getItem(v.label, v.key, <FileWordOutlined />,
                v.children.map(o => {
                    return getItem(o.label, articleRouter?.originalPath + o.key)
                })
            );
        }

        return getItem(v.label, articleRouter?.originalPath + v.key, <FileWordOutlined />)
    }),
];

export default () => {
    const [userName, setUserName] = useState("HuYu")
    const [menuKey, setMenuKey] = useState(history.location.pathname)

    const setBreadcrumb = useMenuStore((state: any) => state.setBreadcrumb)

    const init = () => {
        setBreadcrumb(activeRouter?.name)
    }

    useEffect(() => {
        init();
    }, [])

    const onClick: MenuProps['onClick'] = (e) => {
        setBreadcrumb((e.domEvent.target as any).innerText);
        setMenuKey(e.key)
        history.push(e.key);
    }

    const collapsed = useMenuStore((state: any) => state.collapsed);

    const nameBox = useMemo(() => <div className='first-name'>{userName[0]}</div>, [userName])

    return (
        <div className={styled.menu} style={collapsed ? {
            width: "5%"
        } : {
            width: "15%"
        }}>
            <div className='user-box'>
                {nameBox}
                {collapsed ? "" :
                    <p>{userName + "个人空间"}</p>
                } </div>
            <Menu
                inlineCollapsed={collapsed}
                onClick={onClick}
                selectedKeys={[menuKey]}
                mode="inline"
                items={items}
            >
            </Menu>
        </div>
    )
}