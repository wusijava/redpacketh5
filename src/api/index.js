const method = {
    user:{
        login: '/login',
        register: '/register',
        exit: '/logout',
        change:'/api/change'
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
        transfer: '/api/transfer',
        getReceiveList: '/api/getReceiveList'
    }
}
export default method;
