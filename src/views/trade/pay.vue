<template>
    <div class="box">
        <div class="main">
            <p>请将支付宝打开，“扫一扫”向我授权冻结</p>
            <div class="content-title">
                <p>{{detail.mealTitle}}</p>
            </div>
            <div class="content">
                <div class="content-code">
                    <div class="code" v-if="url">
                        <QrCode
                                :width="290"
                                :height="232"
                                :url="url"
                        />
                    </div>
                </div>
                <div class="content-price">
                    <div style="border-top: #efefef 1px solid;width:82%;margin-left: 10%;"></div>
                    <div class="content-item">
                        <div class="receive">
                            <img src="../../assets/img/icon_receive@2x.png">
                            <p>￥<span style="font-size: 22px;font-weight: bold;">{{detail.amount}}</span></p>
                        </div>
                        <div class="pay">
                            <img src="../../assets/img/icon_pay@2x.png">
                            <p style="margin-top:15px;">分<span style="font-weight: bold">{{detail.num}}</span>月转支付</p>
                            <p>￥<span style="font-size: 22px;font-weight: bold;">{{detail.eachMoney}}</span>&nbsp;/月</p>
                        </div>
                    </div>
                </div>
            </div>
            <p style="text-align: left">注：该订单冻结月份为{{detail.num}}个月，每月转支付金额{{detail.eachMoney}}元</p>
        </div>
    </div>
</template>

<script>
    import {getPayDetail,tradeStateQuery} from "../../api/trade";
    import QrCode from "../../components/QrCode";

    export default {
        name: "pay",
        data() {
            return {
                pay: '',
                url: '',
                queryInterval:null,
                detail: {}
            }
        },
        components:{
            QrCode
        },
        mounted() {
            this.getPayDetail();
        },
        methods: {
            async queryStatus(){
                let params = {};
                params.tradeNo = this.$route.query.tradeNo
                const result = await tradeStateQuery(params);
                if(result.data.code=="20000"){
                    const state = result.data.data.orderStatus;
                    if(state=="PAY_SUCCESS"){
                        clearInterval(this.queryInterval);
                        this.queryInterval = null;
                        this.$router.push({
                            path:'/trade/success',
                            query:{
                                title: result.data.data.title,
                                tradeNo:result.data.data.tradeNo,
                                outTradeNo:result.data.data.outTradeNo,
                                totalMoney:result.data.data.totalMoney
                            }})
                    }else if(state=="PAY_CLOSED"){
                        clearInterval(this.queryInterval);
                        this.queryInterval = null;
                        this.$dialog.confirm({
                            message: '交易超时,是否重新创建?'
                        }).then(() => {
                            this.reload();
                        }).catch(() => {
                            this.$router.push({path:'/trade/fail',query:{desc:'交易超时,订单关闭'}})
                        });
                    }
                }
            },
            getPayDetail: async function() {
                let params = {}
                params.tradeNo = this.$route.query.tradeNo
                const result = await getPayDetail(params)
                if(result.data.code == '20000') {
                    this.detail = result.data.data
                    this.url = this.detail.url;
                    this.queryInterval = setInterval(this.queryStatus,5000);
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            async reload(){
                window.location.reload()
            }
        },
        deactivated() {
            clearInterval(this.queryInterval)
        },
        destroyed() {
            clearInterval(this.queryInterval)
        }
    }
</script>

<style scoped>
    .box{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #3385FF;
    }
    .main {
        padding: 20px;
    }
    .main p {
        font-size: 0.75rem;
        text-align: center;
        color: #ffffff;
        font-family: PingFang-SC-Regular;
    }
    .content{
        width: 100%;
        height: 420px;
        padding-bottom: 15px;
        border-radius: 0 0 6px 6px;
        background-color: #ffffff;
    }
    .content-title {
        background-color: #c6ddff;
        height: 42px;
        border-radius: 6px 6px 0px 0px;
    }
    .content-title p {
        font-size: 16px;
        line-height: 40px;
        color: #3385ff;
        text-align: center;
    }
    .content-code{
        /*padding:15px 42px ;*/
    }
    .content-code .code{
        width: 290px;
        height: auto;
        margin: 0 auto;
        background-color: #ffffff;
    }
    .content-item{
        display: flex;
        text-align: center;
    }
    .content-item .receive,.pay{
        flex: 1;
        padding: 20px 0;
    }
    .receive img,.pay img{
        width: 30px;
        height: 30px;
    }
    .receive>p{
        color: #121212;
        font-size: 13px;
        padding-top: 10px;
        font-family: PingFang-SC-Regular;
    }
    .content-item .pay{
        flex: 1;
    }
    .pay p{
        font-size: 13px;
        color: #121212;
        font-family: PingFang-SC-Regular;
        margin: 0;
        border-left: 1px solid #F2F5FA;
    }
</style>
