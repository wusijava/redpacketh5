<template>
    <div class="box">
        <div class="main">
            <div style="text-align: center">
                <img src="@/assets/img/icon_complete@2x.png" style="width: 70px;height: 100%;margin-top: 16px">
                <p class="success">授权成功</p>
                <p class="money"><span style="font-size: 20px">￥</span>{{totalMoney}}</p>
            </div>
            <div class="info">
                <van-row type="flex" justify="space-between">
                    <van-col span="6"><p>商品</p></van-col>
                    <van-col span="18" class="right">
                        <p>{{title}}</p></van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                    <van-col span="6"><p>订单编号</p></van-col>
                    <van-col span="18" class="right">
                        <p>{{outTradeNo}}</p>
                    </van-col>
                </van-row>
            </div>
            <div style="margin: 15px" v-if="openImgState == true">
                <van-button class="button" type="info" block size="small" icon="back-top" plain
                            @click="toCreateUpload">上传图片
                </van-button>
                <p style="font-size: 12px;color: #bbbbbb; margin-top: 15px;text-align: center;">注意：完成图片上传后，将自动进行打款</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOpenImgState} from '../../api/trade'

    export default {
        name: "authSuccess",
        data() {
            return {
                title:this.$route.query.title,
                tradeNo: this.$route.query.tradeNo,
                outTradeNo: this.$route.query.outTradeNo,
                totalMoney: this.$route.query.totalMoney,
                openImgState: false
            }
        },
        mounted() {
            this.getOpenImgState()
        },
        methods:{
            async getOpenImgState() {
                let params = {};
                const result = await getOpenImgState(params);
                if(result.data.code == '20000') {
                    this.openImgState = result.data.data
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            toCreateUpload() {
                this.$router.push({name:'createUpload', query:{tradeNo: this.tradeNo}});
            }
        }
    }
</script>

<style scoped>
    .box{
        padding: 15px;
    }
    .main {
        overflow: scroll
    }
    .main .success{
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        color: #3396ff;
    }
    .main .money{
        font-family: Roboto-Bold;
        color: #081828;
        font-size: 35px;
        margin-top: 10px;
    }
    .info{
        padding: 0 10px 10px 10px;
    }
    .info .right{
        text-align: right;
    }
    .info  p{
        font-size: 14px;
        line-height: 18px;
        word-wrap : break-word;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    .button {
        border-radius: 6px;
    }

</style>
