import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
    mode: 'history',
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
            path: '/entrance/select-action',
            name: 'selectAction',
            component: () => import('./views/entrance/select-action.vue'),
            meta: {
                title: '预授权业务'
            }
        },
        {
            path: '/merchant',
            name: 'merchantIndex',
            component: () => import('./views/merchant/index.vue'),
            meta: {
                title: '商户签约'
            }
        },
        {
            path: '/merchant/service-agreement',
            name: 'serviceAgreement',
            component: () => import('./views/merchant/service-agreement.vue'),
            meta: {
                title: '服务协议'
            }
        },
        {
            path: '/merchant/success',
            name: 'merchantSuccess',
            component: () => import('./views/merchant/success.vue'),
            meta: {
                title: '注册成功'
            }
        },
        {
            path: '/trade',
            name: 'tradeIndex',
            component: () => import('./views/trade/index.vue'),
            meta: {
                title: '业务办理'
            }
        },
        {
            path: '/trade/create',
            name: 'create',
            component: () => import('./views/trade/create.vue'),
            meta: {
                title: '订单确认'
            }
        },
        // 上传图片
        {
            path: '/trade/create-upload',
            name: 'createUpload',
            component: () => import('./views/trade/create-upload.vue'),
            meta: {
                title: '订单确认'
            }
        },
        {
            path: '/trade/pay',
            name: 'pay',
            component: () => import('./views/trade/pay.vue'),
            meta: {
                title: '订单支付'
            }
        },
        {
            path: '/trade/payment-agreement',
            name: 'paymentAgreement',
            component: () => import('./views/trade/payment-agreement.vue'),
            meta: {
                title: '支付协议'
            }
        },
        {
            path: '/refund/refund-query',
            name: 'refundQuery',
            component: () => import('./views/refund/refund-query.vue'),
            meta: {
                title: '退款查询'
            }
        },
        {
            path: '/refund/refund-confirm',
            name: 'refundConfirm',
            component: () => import('./views/refund/refund-confirm.vue'),
            meta: {
                title: '退款查询'
            }
        },
        {
            path: '/refund',
            name: 'refund',
            component: () => import('./views/refund/refund.vue'),
            meta: {
                title: '订单退款'
            }
        },
        {
            path: '/order/list',
            name: 'orderList',
            component: () => import('./views/order/list.vue'),
            meta: {
                title: '订单列表'
            }
        },
        {
            path:'/trade/fail',
            name:'authFail',
            component:() => import('./views/trade/auth-fail.vue'),
            meta: {
                title: '收款失败'
            }
        },
        {
            path:'/trade/success',
            name:'authSuccess',
            component:() => import('./views/trade/auth-success.vue'),
            meta: {
                title: '授权成功'
            }
        },
        {
            path:'/refund/success',
            name:'refundSuccess',
            component:() => import('./views/refund/refund-success.vue'),
            meta: {
                title: '退款成功'
            }
        },
        {
            path:'/auth/error',
            name:'error',
            component:() => import('./views/refund/error.vue'),
            meta: {
                title: '冻结失败'
            }
        },
        //领取人信息填写
        {
            path: '/redPacket/informationFilling',
            name: 'informationFilling',
            component: () => import('./views/redPacket/information-filling.vue'),
            meta: {
                title: '湖北点赞科技有限公司'
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
            path: '/redPacket/redPacketList',
            name: 'redPacketList',
            component: () => import('./views/redPacket/redPacket-list.vue'),
            meta: {
                title: '红包领取'
            }
        },
        {
            path: '/redPacket/redPacketReceive',
            name: 'redPacketReceive',
            component: () => import('./views/redPacket/redPacket-receive.vue'),
            meta: {
                title: '红包'
            }
        },
        {
            path: '/redPacket/redPacketReceiveSuccess',
            name: 'redPacketReceiveSuccess',
            component: () => import('./views/redPacket/redPacket-receive-success.vue'),
            meta: {
                title: '红包'
            }
        },
        {
            path: '/redPacket/redPacketReceiveRecords',
            name: 'redPacketReceiveRecords',
            component: () => import('./views/redPacket/redPacket-receive-records.vue'),
            meta: {
                title: '红包领取记录'
            }
        },
    ]
})
