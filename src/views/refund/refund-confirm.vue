<template>
    <div class="box">
        <van-cell-group style="margin-top: 10px">
            <van-field
                    v-model="detail.storeName"
                    clearable
                    :clickable="false"
                    :placeholder="detail.storeName"
                    input-align="right"
                    label-width="100"
                    label="商户名称"
                    readonly
            />
            <van-field
                    v-model="detail.outTradeNo"
                    clearable
                    :clickable="false"
                    :placeholder="detail.outTradeNo"
                    input-align="right"
                    label-width="100"
                    label="订单编号"
                    readonly
            />
            <van-field
                    v-model="detail.amount"
                    clearable
                    :clickable="false"
                    :placeholder="detail.amount"
                    input-align="right"
                    label-width="100"
                    label="订单金额"
                    readonly
            />
            <van-field
                    v-model="detail.num"
                    clearable
                    :clickable="false"
                    :placeholder="detail.num + '期'"
                    input-align="right"
                    label-width="100"
                    label="分期期数"
                    readonly
            />
            <van-field
                    v-model="detail.sellerNo"
                    clearable
                    :clickable="false"
                    :placeholder="detail.sellerNo"
                    input-align="right"
                    label-width="100"
                    label="收款账号"
                    readonly
            />
            <van-field
                    v-model="detail.finishTime"
                    clearable
                    :clickable="false"
                    :placeholder="detail.finishTime"
                    input-align="right"
                    label-width="100"
                    label="交易时间"
                    readonly
            />
            <van-field
                    v-model="detail.refundTypeDesc"
                    clearable
                    :clickable="false"
                    :placeholder="detail.refundTypeDesc"
                    input-align="right"
                    label-width="100"
                    label="是否赔偿违约金"
                    readonly
            />
        </van-cell-group>
        <div class="content">
            <p>请将支付宝打开，“扫一扫”向我付款</p>
            <div class="code" v-if="detail.qrCodeUrl">
                <QrCode
                        :width="290"
                        :height="232"
                        :url="detail.qrCodeUrl"
                />
            </div>
            <p style="margin-bottom: 0;">退款金额</p>
            <p style="margin-top: 0;">￥<span style="font-size: 22px;font-weight: bold;">{{detail.transferAmount}}</span></p>
        </div>
    </div>
</template>

<script>
    import {queryRefundDetail, queryTradeState} from '../../api/refund'
    import QrCode from "../../components/QrCode";

    export default {
        name: "refundConfirm",
        data() {
            return {
                outTradeNo: '',
                detail: {},
                queryInterval: '',
                index: 0
            }
        },
        components:{
            QrCode
        },
        mounted() {
            this.outTradeNo = this.$route.query.outTradeNo;
            this.getRefundDetail();
        },
        methods: {
            getRefundDetail: async function() {
                let params = {}
                params.outTradeNo = this.outTradeNo;
                const result = await queryRefundDetail(params)
                if(result.data.code == '20000') {
                    this.detail = result.data.data
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
                    const state = result.data.data;
                    if(state==1){
                        clearInterval(this.queryInterval);
                        this.queryInterval = null;
                        location.href = '/h5/refund/success?type=0'
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
                    clearInterval(this.queryInterval);
                    this.queryInterval = null;
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
        background: #F2F5FA;
        height: 100%;
    }
    .button {
        border-radius: 3px;
    }
    .content{
        background: #F2F5FA;
        padding-bottom: 40px;
    }
    .content p {
        font-size: 16px;
        line-height: 40px;
        color: #121212;
        text-align: center;
    }
    .content .code{
        width: 290px;
        height: auto;
        margin: 0 auto;
        background-color: #ffffff;
    }
</style>