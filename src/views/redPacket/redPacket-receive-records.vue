<template>
    <div class="box">
        <div class="content">
            <van-empty image="search" description="暂无匹配订单" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id">
                <van-row style="border-bottom: 1px solid #E6EBF2; padding-bottom: 5px">
                    <van-col span="15">
                        <p>订单编号：{{item.tradeNo}}</p>

                    </van-col>
                    <van-col span="9">
                        <p  style="text-align: right"
                            :class="{
                            'color-1':item.state === 0,
                            'color-2':item.state === 1,
                            'color-3':item.state === 2,
                            'color-3':item.state === 3,
                            'color-3':item.state === 4,
                            'color-3':item.state === 5,
                            'color-4':item.state === 6}">
                            {{item.payState}}
                        </p>
                    </van-col>
                </van-row>
                <van-row style="padding: 10px 0;">
                    <van-col span="12"><h4>红包金额：<span style="font-size: 12px">￥</span>{{item.amount}}</h4></van-col>
                    <van-col span="12"><p style="text-align: right;margin-top: 2px">{{item.stateDesc}}</p></van-col>
                </van-row>
                <van-row>
                    <van-col span="24"><p style="margin-top: 5px;">领取支付宝账号：{{item.receiverAliNo}}</p></van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {queryRedPacketRecord} from "../../api/commission";

    export default {
        name: "redPacketListRecord",
        data() {
            return {
                aliPayUid: this.$route.query.aliPayUid,
                showEmpty: false,
                list: [],
                fontColor:{
                    color: '#666'
                },
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList: async function() {
                let params = {};
                params.aliPayUid = this.aliPayUid
                const result = await queryRedPacketRecord(params);
                if (result.data.code == '20000') {
                    if(result.data.data != null) {
                        this.showEmpty = false;
                        this.list = result.data.data;
                    }else {
                        this.showEmpty = true;
                        this.list = [];
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            toReceive() {

            },
            receiveRecords() {
                this.$router.push({name:'redPacketReceiveRecords'});
            }
        }
    }
</script>

<style scoped>
    html,
    body {
        width: 100%;
        height: 100%;
    }
    .box{
        display:flex; /*父元素的定义为flex布局*/
        width:100%;
        height: calc(100vh - 0px); /* 高度自适应*/
        flex-direction: column; /*定义排列方向为竖排*/
        background: #F3F3F5;
    }
    .box .content{
        flex:1; /*中间分配剩下的所有空间*/
        overflow:auto;
        margin: 15px 12px 0 12px;
    }
    .content .list{
        background: #ffffff;
        border-radius: 3px;
        padding: 8px;
        margin-bottom: 8px;
    }
    .content .list p {
        font-size: 0.75em;
        margin: 0;
        line-height: 16px;
    }
    .content .list h4 {
        font-size: 1rem;
        margin: 0;
        color: #121212;
        line-height: 24px;
    }
    .box .footer{
        height: 65px;
    }
    .van-pagination {
        line-height: 60px;
    }
    .box .footer >>>.van-pagination__item {
        height: 65px;
    }
    .van-button{
        border-radius: 3px;
    }
    .btn-small{
        height:24px;
        min-width: 50px;
        line-height: 24px;
        font-size: 0.75em;
    }
    .color-1{
        color: #2873FF;
    }
    .color-2{
        color: #269B26;
    }
    .color-3{
        color: #FF8400;
    }
    .color-4{
        color: #9C00FF;
    }
</style>