<template>
    <div class="box">
        <div class="main">
            <p>商户需要支付￥{{tradeRefund.transferAmount}}元（其中包含：结算款{{tradeRefund.amount}}元、返佣{{tradeRefund.rebateAmount}}元)</p>
            <p v-if="tradeRefund.refundType==0">、违约金{{tradeRefund.defaultAmount}}元</p >
            <p>请顾客将支付宝打开，“扫一扫”向我付款</p>
            <div class="content-title">
                <p>订单编号：{{outTradeNo}}</p>
            </div>
            <div class="content">
                <div class="content-code">
                    <div class="code" v-if="tradeRefund.qrCodeUrl">
                        <QrCode
                                :width="290"
                                :height="232"
                                :url="tradeRefund.qrCodeUrl"
                        />
                    </div>
                </div>
                <div class="content-item">
                    <div class="receive">
                        <p>￥<span style="font-size: 22px;font-weight: bold;">{{tradeRefund.amount}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {confirmRefund, queryTradeState} from '../../api/refund';
    import QrCode from "../../components/QrCode";

    export default {
        name: "refund",
        data() {
            return {
                outTradeNo: '',
                wayId: '',
                tradeRefund: {},
                queryInterval: '',
                index: 0
            }
        },
        components:{
            QrCode
        },
        mounted() {
            this.outTradeNo = this.$route.query.outTradeNo;
            this.wayId = this.$route.query.wayId;
            this.confirmRefund()
        },
        methods: {
            confirmRefund: async function() {
                let params = {}
                params.outTradeNo = this.outTradeNo;
                params.wayId = this.wayId;
                const result = await confirmRefund(params)
                if(result.data.code == '20000') {
                    this.tradeRefund = result.data.data;
                    this.queryInterval = setInterval(this.queryPayState, 5000);
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            queryPayState: async function() {
                let params = {}
                params.outTradeNo = this.outTradeNo

                const result = await queryTradeState(params)
                if(result.data.code == '20000') {
                    const state = result.data.data.status;
                    if(state==1){
                        clearInterval(this.queryInterval);
                        this.queryInterval = null;
                        location.href = '/h5/refund/refund-success?type=0'
                    }
                    this.index ++;
                    if (this.index >= 30) {
                        clearInterval(this.queryInterval);
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            }
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
        height: 380px;
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
        color: #121212;
        text-align: center;
    }
    .content-code{
        /*padding:15px 47px ;*/
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
        padding: 0;
        margin-top: 10px;
    }
    .receive {
        border-top: 1px dashed #bbbbbb;
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

</style>