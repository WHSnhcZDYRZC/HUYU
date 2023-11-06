import { DownOutlined, FileWordOutlined, HomeOutlined, RightOutlined, SettingOutlined, UpOutlined } from '@ant-design/icons';

export default [
    {
        path: '/',
        redirect: '/application/',
    },
    {
        name: '个人中心',
        path: '/personal',
        microApp: 'personal',
        icon: HomeOutlined,
    },
    {
        name: '系统中心',
        path: '/system',
        microApp: 'system',
        icon: SettingOutlined,
    },
    {
        name: '文章中心',
        originalPath: "/application/",
        path: '/application/*',
        microApp: 'application',
        isHidden: true,
    },
    {
        name: '单点登录',
        originalPath: "/sso/",
        path: '/sso/*',
        microApp: 'sso',
        isHidden: true,
        layoutHidden: true
    },
];
