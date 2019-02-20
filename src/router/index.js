import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/table'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '会议信息' }
                },
                {
                    path: '/screen',
                    name: 'screen',
                    params: {},
                    component: resolve => require(['../components/page/screen.vue'], resolve),
                    meta: { title: '大屏幕' }
                },
                {
                    path: '/sbbuild',
                    name: 'sbbuild',
                    params: {},
                    component: resolve => require(['../components/page/sbbuild.vue'], resolve),
                    meta: { title: '魔剑build' }
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
