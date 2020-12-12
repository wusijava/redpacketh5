import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
    mode: 'hash',
    base: 'h5',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('./views/logout.vue'),
            meta: {
                title: '切换账号'
            }
        },
        {
            path: '/redPacket/redPacketQuery',
            name: 'redPacketQuery',
            component: () => import('./views/redPacket/redPacket-query.vue'),
            meta: {
                title: '红包领取'
            }
        },
        {
            path: '/user/register',
            name: 'register',
            component: () => import('./views/user/register.vue'),
            meta: {
                title: '注册页面'
            }
        },
        {
            path: '/user/success',
            name: 'registerSuccess',
            component: () => import('./views/user/success.vue'),
            meta: {
                title: '成功页面'
            }
        },
        {
            path: '/wallet/wallet',
            name: 'wallet',
            component: () => import('./views/wallet/wallet.vue'),
            meta: {
                title: '我的钱包'
            }
        }
        ,
        {
            path: '/user/set',
            name: 'set',
            component: () => import('./views/user/set.vue'),
            meta: {
                title: '用户设置'
            }
        },
        {
            path: '/user/changePassword',
            name: 'changePassword',
            component: () => import('./views/user/change-password.vue'),
            meta: {
                title: '修改密码'
            }
        }
    ]
})
