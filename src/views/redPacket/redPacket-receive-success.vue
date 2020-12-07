<template>
    <div class="box">
        <img src="../../assets/img/pic_bj_y.png"/>
        <div class="title">
            <p>红包领取成功</p>
            <h2>{{amount}}<span>元</span></h2>
        </div>
        <div class="divider">
            <van-divider :style="{ fontSize: '15px', color: '#EA484D', borderColor: '#EA484D', padding: '0 36px' }">
                领取其他红包
            </van-divider>
        </div>
        <div class="receive">
            <van-form @submit="toSearch">
                <van-field
                        v-model.trim="tradeNo"
                        clearable
                        type="text"
                        placeholder="请输入订单号"
                />
                <div style="margin-top: 16px;">
                    <van-button class="button" block color="#EA484D" native-type="submit">
                        查询
                    </van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    import {queryRefund} from '../../api/refund';
    import {orderList} from "../../api/order";

    export default {
        name: "redPacketReceiveSuccess",
        data() {
            return {
                tradeNo: '',
                aliPayUid: this.$route.query.aliPayUid,
                rebateNo: this.$route.query.rebateNo,
                amount: this.$route.query.amount
            }
        },
        mounted() {
        },
        methods: {
            toSearch: async function() {
                this.$router.push({
                    name: 'redPacketList',
                    query:{
                        tradeNo: this.tradeNo,
                        aliPayUid: this.aliPayUid
                    }});
            }
        }
    }
</script>

<style scoped>
    .box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #FFF1D5;
    }
    .box img {
        width: 100%;
    }
    .title {
        position: relative;
        top: -250px;
    }
    .title p {
        font-size: 17px;
        color: #FFDF9D;
        text-align: center;
    }
    .title h2 {
        font-size: 50px;
        color: #FFDF9D;
        text-align: center;
    }
    .title span{
        font-size: 18px;
        color: #FFDF9D;
        text-align: center;
        margin-left: 5px;
    }
    .divider {
        position: relative;
        top: -130px;
    }
    .receive {
        padding: 30px;
        position: relative;
        top: -150px;
    }
    .button {
        border-radius: 6px;
    }

</style>