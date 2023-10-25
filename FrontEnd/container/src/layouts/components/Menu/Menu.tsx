import { FileWordOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styled from './Menu.less';
import router from '@/config/router';
import { history } from 'umi';

console.log("router", router);

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

const necessityRouter = router.filter((v) => (v.name && v.name != "文章中心"))

console.log("necessityRouter", necessityRouter);

const items: MenuProps['items'] = [
    getItem(null, 'grp', null,
        necessityRouter.map((v, i: number) => i ? getItem(v.name, v.path, <SettingOutlined />) : getItem(v.name, v.path, <HomeOutlined />)),
        'group'),

    { type: 'divider' },

    getItem('Navigation Two', 'sub2', <FileWordOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4', <FileWordOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),


];

export default () => {
    const onClick: MenuProps['onClick'] = (e) => history.push(e.key);

    return (
        <div className={styled.menu}>
            <div className='user-box'> xxx 个人空间 </div>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            >
            </Menu>
        </div>
    )
}