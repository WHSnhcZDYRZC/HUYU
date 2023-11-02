import { DownOutlined, FileWordOutlined, HomeOutlined, RightOutlined, SettingOutlined, UpOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styled from './Menu.less';
import router from '@/config/router';
import { history } from 'umi';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useMenuStore, { MenuStateInf } from '@/store/menuStore';
import Animation from '@/components/Animation/Animation';

interface MenuItemInf {
    children?: MenuItemInf[],
    label: string,
    key: string | number,
    path: string,
    id: string | number,
    icon?: any,
    [key: string]: any
}

const pageRouters: MenuItemInf[] = [
    {
        label: "Java",
        key: "Java1",
        id: "1023",
        path: "/application/1023"
    },
    {
        label: "Js",
        key: "Js1",
        id: "1024",
        path: "/application/1024",
        isOpen: false,
        children: [
            {
                label: "JavaScript 是什么",
                key: "Js2",
                id: "1025",
                path: "/application/1024/1025"
            },
            {
                label: "JavaScript 是什么2",
                key: "Js3",
                id: "1026",
                path: "/application/1024/1026"
            }
        ]
    }
]

// 临时代码
const ActiveClassName = "active";

const MenuItems: React.FC = memo(() => {
    const setBreadcrumb = useMenuStore((state: any) => state.setBreadcrumb)
    const [_pageRouters, _setPageRouters] = useState<MenuItemInf[]>(pageRouters);

    const _router: MenuItemInf[] = router.filter(v => v.name)
        .map(({ name, path, originalPath, isHidden, icon }: any) => {
            return {
                label: name,
                key: name,
                path: isHidden ? originalPath : path,
                id: name,
                isHidden,
                icon,
            }
        });

    const menuItemClickHandler = (routerItemData: MenuItemInf) => {
        const activeItem = menuRefs.current[routerItemData.path].dom;

        const haveClassName = [...activeItem.classList].some((v: string) => v === ActiveClassName);
        if (haveClassName) return;
        Object.keys(menuRefs.current).forEach(v =>
            menuRefs.current[v].dom.classList.remove(ActiveClassName, "childActive"))
        activeItem.classList.add(ActiveClassName);

        setBreadcrumb(routerItemData.label);
        history.push(routerItemData.path);
    }

    const init = () => {
        const routerIdx = [...Object.keys(menuRefs.current)].find(v => menuRefs.current[v].path === history.location.pathname);

        const _activeRouter = routerIdx ? menuRefs.current[routerIdx] : null;

        const { path } = _activeRouter

        let activePath = path.split("/")
        console.log("activePath", activePath);
        if (activePath.length > 3) {
            activePath = activePath.slice(0, 3).join("/");

            menuRefs.current[activePath].dom.classList.add("childActive")
        }

        if (_activeRouter) {
            _activeRouter.dom.classList.add(ActiveClassName);
            setBreadcrumb(_activeRouter?.label)
        }

    }

    const checkedOpenIconHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: MenuItemInf) => {
        e.stopPropagation();

        _setPageRouters((old) => {
            const changeItem = old.find(o => o.path === v.path)
            changeItem && (changeItem.isOpen = !changeItem.isOpen);
            return JSON.parse(JSON.stringify(old));
        })
    }

    const menuRefs = useRef<any>({});

    const menuHandler = (router: MenuItemInf[]): any => {
        return router.filter(v => !v.isHidden).map((v, i: number) => {

            return (
                <>
                    <div
                        ref={r => menuRefs.current[v.path] = { dom: r, ...v }}
                        className='menu-item'
                        onClick={() => menuItemClickHandler(v)}
                        key={v.path}
                    >
                        {
                            v.children?.length ?

                                <span className='children-icon'>
                                    {
                                        v.isOpen ? <DownOutlined onClick={(e) => checkedOpenIconHandler(e, v)} /> : <RightOutlined onClick={(e) => checkedOpenIconHandler(e, v)} />
                                    }
                                </span>
                                : ""

                        }

                        <span className='icon'>
                            {
                                v.icon ? React.createElement(v.icon) : <FileWordOutlined />
                            }
                        </span>
                        <span className='label'>
                            {v.label}
                        </span>
                        <span className='more'>

                        </span>


                    </div>

                    {
                        v.children ?
                            <div className={v.isOpen ? 'childShow' : 'childHidden'}>
                                {
                                    menuHandler(v.children)
                                }
                            </div>
                            : <></>
                    }
                </>
            )
        })
    }

    const userMenu = useMemo(() => {
        return menuHandler(_pageRouters)
    }, [_pageRouters])

    const systemMenu = useMemo(() => {
        return menuHandler(_router)
    }, [_router])

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <div className='system-router router-flex'>
                {systemMenu}
            </div>

            <div className='user-router router-flex'>
                {userMenu}
            </div>
        </>
    )
});

export default () => {
    const [userName, setUserName] = useState("HuYu")
    const [menuKey, setMenuKey] = useState(history.location.pathname)

    const collapsed = useMenuStore((state) => state.collapsed);

    const nameBox = useMemo(() => <div className='first-name'>{userName[0]}</div>, [userName])

    return (
        <>
            <div id='rootMenu' className={`${styled.menu} ${!collapsed ? "width15" : "width0"}`}>

                <Animation
                    className='user-box' animationName='animate__bounceIn'
                >
                    <>
                        {nameBox}
                        <p>{userName + "个人空间"}</p>
                    </>
                </Animation>

                <div className='menu'>
                    <MenuItems />
                </div>
            </div>
        </>
    )
}