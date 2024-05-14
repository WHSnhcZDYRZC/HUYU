import { DownOutlined, FileWordOutlined, HomeOutlined, RightOutlined, SettingOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';

export default [
    {
        path: '/',
        redirect: '/personal',
    },
    {
        name: '个人中心',
        path: '/personal',
        microApp: 'personal',
        icon: HomeOutlined,
    },
    {
        name: '系统中心',
        path: '/system/',
        microApp: 'system',
        icon: SettingOutlined,
        routes: [
            {
                path: '/system/*',
                microApp: 'system',
            },
        ],
    },
    {
        name: '用户中心',
        path: '/system/userManagement',
        microApp: 'system',
        icon: UserOutlined,
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
