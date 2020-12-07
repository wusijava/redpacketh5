<template>
    <div class="box">
        <van-row class="header">
            <van-col offset="12" span="12">
                <p @click="changeUser">切换领取人</p>
            </van-col>
        </van-row>

        <van-form style="margin-top: 10px" @submit="toSearch">
            <van-field
                    v-model.trim="tradeNo"
                    clearable
                    type="text"
                    placeholder="请输入订单号"
            />
            <div style="margin: 16px;">
                <van-button class="button" block type="info" native-type="submit">
                    查询
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {changeUser, selectReceiver} from '../../api/commission';

    export default {
        name: "redPacketQuery",
        data() {
            return {
                tradeNo: '',
                loading: false,
                redpacket: false,
                aliPayUid: this.$route.query.aliPayUid
            }
        },
        mounted() {
        },
        methods: {
            async changeUser() {
                let params = {};
                params.aliPayUid = this.aliPayUid
                const result = await changeUser(params)
                if(result.data.code == '20000') {
                    this.user = result.data.data
                    this.$router.push({
                        name:'informationFilling',
                        query:{
                            aliPayUid: this.aliPayUid,
                            merchantStoreNo: this.user.merchantStoreNo,
                            merchantStoreName: this.user.merchantStoreName,
                            receiverAliNo: this.user.receiverAliNo,
                            receiverAliName: this.user.receiverAliName,
                            phoneNo: this.user.phoneNo,
                        }});
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            toSearch: async function() {
                if(this.tradeNo == '' || this.tradeNo == null) {
                    this.$toast({
                        message: '订单编号不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.aliPayUid == '' || this.aliPayUid == null) {
                    this.$toast({
                        message: '支付宝uid不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                let params = {};
                params.tradeNo = this.tradeNo
                params.aliPayUid = this.aliPayUid
                const result = await selectReceiver(params);
                if (result.data.code == '20000') {
                    if(result.data.data == true) {
                        this.$router.push({
                            name:'redPacketList',
                            query:{
                                tradeNo: this.tradeNo,
                                aliPayUid: this.aliPayUid
                            }});
                    }else {
                        this.$toast({
                            message: '未查询到红包',
                            icon: 'warning-o'
                        });
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
        background: #F2F5FA;
        padding-left: 10px;
        padding-right: 10px;
    }
    .button {
        border-radius: 6px;
    }
    .box .header{
        height: 35px;
        margin: 5px 15px;
    }
    .box .header p{
        font-size: 13px;
        text-align: right;
        margin: 6px 0 0 ;
        color: #666666;
    }
</style>
