const method = {
    user:{
        login: '/login',
        register: '/register',
        exit: '/logout',
        change:'/api/change'
    },
    area:{
        list: '/area/areaList'
    },
    merchant:{
        submit: '/merchant/merchantApply'
    },
    trade:{
        store: 'api/merchantStore/getStoreInfo',
        mealList: 'api/meal/getMealList',
        cashierList: 'api/merchantStore/getCashierList',
        createOrder:'api/trade/createOrder',
        payDetail:'api/trade/getPayDetail',
        create:'createAuthPrePay',
        queryContract:'orderDetail',
        queryState:'api/trade/queryTradeState',
        saveContract:'contract/signatureUpload',
        imgState:'api/trade/openImgUpload',
        createOrderUpload:'api/trade/uploadTradePhoto',
        tradeUploadDetail:'api/trade/getTradeUploadDetail'
    },
    refund:{
        queryRefund: 'refund/getOrderResult',
        queryRefundDetail: 'refund/getRefundDetail',
        queryTradeState: 'refund/queryTradeState'
    },
    order:{
        list: 'api/trade/list',
        detail: 'api/trade/detail'
    },
    upload:{
        getUploadToken:'/upload/getToken'
    },
    commission:{
        getPage: 'rebateUser/getPage',
        getStoreInfo: '/rebateUser/getStoreInfo',
        submitInformation: '/rebateUser/insertRebateUser',
        selectReceiver: '/api/queryRedPacket',
        queryRedPacket: '/getRedPacketList',
        getRebateRecord: '/rebate/getRebateRecord',
        changeUser: '/rebateUser/handoverRebateUser',
        getRedPacket: '/api/getRedPacket',
        batchRedPacket: '/api/batchRedPacket'
    },
    wallet:{
        getWallet: '/api/getWallet',
        changeAccount: '/api/changeAccount',
        transfer: '/api/transfer'
    }
}
export default method;
