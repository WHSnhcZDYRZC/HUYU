import 'animate.css';
import actions from '@/communication'

export const qiankun = {
    apps: [
        {
            name: 'application',
            entry: '//localhost:5181',
            activeRule: '/application',
            props: {},
        },
        {
            name: 'personal',
            entry: '//localhost:5182',
            activeRule: '/personal',
            props: {},
        },
        {
            name: 'system',
            entry: '//localhost:5183',
            activeRule: '/system',
            props: {},
        },
        {
            name: 'sso',
            entry: '//localhost:5184',
            activeRule: '/sso',
            props: {},
        },
    ]
}

actions.install(qiankun);