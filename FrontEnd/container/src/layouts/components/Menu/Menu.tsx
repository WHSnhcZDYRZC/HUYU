import { DownOutlined, EllipsisOutlined, FileAddOutlined, FileWordOutlined, HomeOutlined, RightOutlined, SettingOutlined, UpOutlined } from '@ant-design/icons';
import styled from './Menu.less';
import router from '@/config/router';
import { history } from 'umi';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import useMenuStore, { MenuItemInf } from '@/store/menuStore';
import Animation from '@/components/Animation/Animation';
import { $, getUUID, transformData } from '@/utils';
import Tools from '../Tools/Tools';
import HistoryStorage from '@/utils/HistoryStorage';
import { getArticleMenu } from '@/api/active';
import animation from '@/utils/animation';
import useFullLoading from '@/store/fullLoadingStore';

// 临时代码
const ActiveClassName = "active";

const MenuItems: React.FC = memo(() => {
    const setBreadcrumb = useMenuStore((state: any) => state.setBreadcrumb)
    const breadcrumb = useMenuStore((state: any) => state.breadcrumb)
    const pageRouters = useMenuStore((state: any) => state.pageRouters)
    const setPageRouters = useMenuStore((state: any) => state.setPageRouters)
    // const setActiveRouter = useMenuStore((state: any) => state.setActiveRouter)
    const userInfo = useFullLoading((state: any) => state.userInfo)

    const _router: MenuItemInf[] = router.filter(v => v.name)
        .map(({ name, path, originalPath, isHidden, icon }: any) => {
            return {
                label: name,
                key: name,
                path: isHidden ? originalPath : path,
                id: "",
                isHidden,
                icon,
            }
        });

    const clearRefClassName = () => {
        Object.keys(menuRefs.current).forEach(v =>
            menuRefs.current[v].dom.classList.remove(ActiveClassName, "childActive"))
    };

    const menuItemClickHandler = (routerItemData: MenuItemInf) => {
        console.log("routerItemData", routerItemData);
        
        const activeItem = menuRefs.current[routerItemData.path].dom;

        const haveClassName = [...activeItem.classList].some((v: string) => v === ActiveClassName);
        if (haveClassName) return;
        clearRefClassName();
        activeItem.classList.add(ActiveClassName);
        setBreadcrumb(routerItemData.label);
        HistoryStorage.setSessionItem("ActiveRouter", routerItemData);
        history.push(routerItemData.path);
    }


    const getArticleMenuHandler = async () => {
        if (!(userInfo.id || HistoryStorage.getItem("userInfo")?.id)) return;
        const { code, data } = await getArticleMenu({
            id: HistoryStorage.getSessionItem("userInfo")?.id
        })

        if (code === 200) {
            const _data = transformData(data);
            setPageRouters(_data)
        }
    }

    useEffect(() => {
        getArticleMenuHandler();
    }, [userInfo?.id])

    const init = () => {
        const routerIdx = [...Object.keys(menuRefs.current)].find(v => menuRefs.current[v].path === history.location.pathname);

        const _activeRouter = routerIdx ? menuRefs.current[routerIdx] : null;

        if (!_activeRouter) return;

        const { path } = _activeRouter

        clearRefClassName();
        let activePath = path.split("/")
        let result;
        if (activePath.length > 3) {
            ; (() => {
                result = [];
                result.push(`/${activePath[1]}/${activePath[2]}`);
                for (let i = 4; i < activePath.length; i++) {
                    result.push(`${result[result.length - 1]}/${activePath[i - 1]}`);
                }
            })();

            result.forEach((activePath) => {
                menuRefs.current[activePath].dom.classList.add("childActive")
            })
        }

        if (_activeRouter) {
            _activeRouter.dom.classList.add(ActiveClassName);
            setBreadcrumb(_activeRouter?.label)
        }

    }

    const checkedOpenIconHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v: MenuItemInf) => {
        e.stopPropagation();
        v.isOpen = !v.isOpen
        setPageRouters(JSON.parse(JSON.stringify(pageRouters)));
    }

    const menuRefs = useRef<any>({});

    const addPageRouterHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, v?: MenuItemInf) => {
        e.stopPropagation();

        const uuid = getUUID()

        const _path = v ? v.path + "/" : "/application/"

        const dataItem = {
            id: "",
            key: "",
            label: "新页面",
            path: _path + uuid
        }

        if (v) {
            v.children = v.children?.length ? [...v.children, dataItem] : [dataItem];
            v.isOpen = true;
        } else {
            pageRouters.push(dataItem)
        }

        setPageRouters(JSON.parse(JSON.stringify(pageRouters)))
        // setActiveRouter(dataItem);
        HistoryStorage.setSessionItem("ActiveRouter", dataItem);
        history.push(dataItem.path);
    }

    const menuHandler = (router: MenuItemInf[], haveMore?: boolean, level = 0): any => {
        level++;
        return router.filter(v => !v.isHidden).map((v, i: number) => {
            return (
                <>
                    <div
                        ref={r => menuRefs.current[v.path] = { dom: r, ...v }}
                        className='menu-item'
                        onClick={() => menuItemClickHandler(v)}
                        key={v.path}
                    >
                        <span className='children-icon' style={{ marginLeft: level * 10 + "px" }} >
                            {
                                v.children?.length ?

                                    <>
                                        {
                                            v.isOpen ? <DownOutlined onClick={(e) => checkedOpenIconHandler(e, v)} /> : <RightOutlined onClick={(e) => checkedOpenIconHandler(e, v)} />
                                        }
                                    </>
                                    : ""

                            }
                        </span>

                        <span className='icon' >
                            {
                                v.icon ? React.createElement(v.icon) : <FileWordOutlined />
                            }
                        </span>
                        <span className='label overflowEllipsis'>
                            {v.label}
                        </span>

                        {
                            haveMore ?
                                <span className='more'>
                                    <EllipsisOutlined />
                                    <FileAddOutlined onClick={(e) => addPageRouterHandler(e, v)} />
                                </span> : <></>
                        }
                    </div>

                    {
                        v.children ?
                            <div className={v.isOpen ? 'childShow' : 'childHidden'}>
                                {
                                    menuHandler(v.children, haveMore, level)
                                }
                            </div>
                            : <></>
                    }
                </>
            )
        })
    }

    const userMenu = useMemo(() => {
        return menuHandler(pageRouters, true)
    }, [pageRouters])

    const systemMenu = useMemo(() => {
        return menuHandler(_router)
    }, [_router])

    useEffect(() => {
        init();
    }, [pageRouters])

    return (
        <>
            <Tools addPageRouterHandler={addPageRouterHandler} />
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
    const collapsed = useMenuStore((state) => state.collapsed);

    const nameBox = useMemo(() => <div className='first-name'>{userName[0]}</div>, [userName])

    const initRootMenuEventHandler = () => {
        const dom = $("#rootMenu");

        if (!dom) return;
        if (collapsed) {
            window.onmousemove = (e) => {
                if (e.clientX < 30) {
                    if ([...dom.classList].includes("miniMenuWidth")) return;
                    dom?.classList.add("miniMenuWidth");
                    animation(dom, "animate__backInLeft", 0.5)
                } else if (e.clientX > 180) {
                    if (!([...dom.classList].includes("miniMenuWidth"))) return;
                    animation(dom, "animate__backOutLeft", 0.5, () => dom.classList.remove("miniMenuWidth"))
                }
            }
        } else {
            window.onmousemove = null
            dom.onmouseleave = null
        }
    }

    useEffect(() => {
        initRootMenuEventHandler()
    }, [collapsed])

    return (
        <>
            <div id='rootMenu' className={`${styled.menu} ${!collapsed ? "width15" : "width0"}`}>

                <Animation
                    className='user-box'
                    animationName='animate__bounceIn'
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