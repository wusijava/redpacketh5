<template>
    <div class="box">
        <div class="main">
            <p>您在首次进行领取红包操作时，您需要绑定领取红包的支付宝账号并补充以下相关信息，提交成功后此页面不会再出现。</p>
            <van-form style="margin-top: 10px; margin-bottom: 20px">
                <van-cell-group>
                    <van-field
                            v-model.trim="merchantStoreNo"
                            input-align="right"
                            clearable
                            label="门店编码"
                            placeholder="请输入门店编码"
                    >
                        <template #button>
                            <van-button size="small" type="info" style="padding-left:10px;padding-right:10px;"
                                        @click="searchWayId">查询
                            </van-button>
                        </template>
                    </van-field>
                    <van-field
                            v-if="merchantStoreName != ''"
                            v-model.trim="merchantStoreName"
                            clearable
                            readonly
                            :clickable="false"
                            input-align="right"
                            label-width="110"
                            label="门店名称"
                    >
                    </van-field>
                    <van-field
                            v-else
                            v-model.trim="merchantStoreName"
                            clearable
                            readonly
                            :clickable="false"
                            input-align="right"
                            label-width="110"
                            label="门店名称"
                    >
                    </van-field>
                    <van-field
                            v-model.trim="receiverAliNo"
                            clearable
                            :clickable="false"
                            input-align="right"
                            label-width="110"
                            label="支付宝账号"
                            placeholder="请输入支付宝账号"
                    >
                    </van-field>
                    <van-field
                            v-model.trim="receiverAliName"
                            clearable
                            :clickable="false"
                            input-align="right"
                            label-width="110"
                            label="支付宝姓名"
                            placeholder="请输入支付宝姓名"
                    >
                    </van-field>
                    <van-field
                            v-model.trim="phoneNo"
                            clearable
                            :clickable="false"
                            type="tel"
                            input-align="right"
                            label-width="110"
                            label="电话"
                            maxlength="11"
                            placeholder="请输入联系电话"
                    >
                    </van-field>
                </van-cell-group>
            </van-form>
        </div>
        <div class="box2">
            <van-button class="button" type="default" size="large" @click="submit">提交</van-button>
        </div>
        <div class="box2">
            <p>1、输入门店编码后点击“查询”；</p>
            <p>2、查看并核对门店名称是否正确；</p>
            <p>3、输入您绑定领取红包的支付宝账号以及实名；</p>
            <p>4、输入您的联系电话并提交。</p>
            <p>注：请保证支付宝账号以及实名的准确性，以免造成领取失败的情况。</p>
        </div>
        <div class="footer-divider">
            <van-divider :style="{ fontSize: '11px', color: '#fff', borderColor: '#fff', padding: '0 16px' }">
                由湖北点赞科技有限公司提供
            </van-divider>
        </div>
    </div>
</template>

<script>
    import {getStoreInfo,submitInformation} from '../../api/commission';

    export default {
        name: "informationFilling",
        data() {
            return {
                form: {},
                merchantStoreNo: '',
                merchantStoreName: '',
                receiverAliNo: '',
                receiverAliName: '',
                phoneNo: '',
                aliPayUid: this.$route.query.aliPayUid
            }
        },
        mounted() {
            if(this.$route.query.merchantStoreNo) {
                this.merchantStoreNo = this.$route.query.merchantStoreNo
            }
            if(this.$route.query.merchantStoreName) {
                this.merchantStoreName = this.$route.query.merchantStoreName
            }
            if(this.$route.query.receiverAliNo) {
                this.receiverAliNo = this.$route.query.receiverAliNo
            }
            if(this.$route.query.receiverAliName) {
                this.receiverAliName = this.$route.query.receiverAliName
            }
            if(this.$route.query.phoneNo) {
                this.phoneNo = this.$route.query.phoneNo
            }
        },
        methods: {
            async searchWayId() {
                if(this.merchantStoreNo == '' || this.merchantStoreNo == null) {
                    this.$toast({
                        message: '门店编码不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                let params = {};
                params.merchantStoreNo = this.merchantStoreNo
                const result = await getStoreInfo(params)
                if(result.data.code == '20000') {
                    this.merchantStoreName = result.data.data
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            async submit() {
                if(this.merchantStoreNo == '' || this.merchantStoreNo == null) {
                    this.$toast({
                        message: '门店编码不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.merchantStoreName == '') {
                    this.$toast({
                        message: '门店编码不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.receiverAliNo == '' || this.receiverAliNo == null) {
                    this.$toast({
                        message: '支付宝账号不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.receiverAliName == '' || this.receiverAliName == null) {
                    this.$toast({
                        message: '支付宝姓名不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.phoneNo == '' || this.phoneNo == null) {
                    this.$toast({
                        message: '联系电话不能为空',
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
                params.merchantStoreNo = this.merchantStoreNo
                params.merchantStoreName = this.merchantStoreName
                params.receiverAliNo = this.receiverAliNo
                params.receiverAliName = this.receiverAliName
                params.phoneNo = this.phoneNo
                params.aliPayUid = this.aliPayUid
                const result = await submitInformation(params)
                if(result.data.code == '20000') {
                    this.$toast({
                        message: result.data.data,
                        icon: 'success-o'
                    });
                    this.$router.push({
                        name:'redPacketQuery',
                        query:{aliPayUid: this.aliPayUid
                        }});
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
        margin: 20px;
        padding: 5px;
        background: #ffffff;
        border-radius: 6px;
    }
    .main p {
        font-size: 11px;
        color: #bbbbbb;
        margin: 0;
        padding: 15px 15px 10px 15px;
    }
    .box2 {
        margin: 20px;
    }
    .box2 p {
        font-size: 12px;
        line-height: 24px;
        color: #ffffff;
        margin: 0;
    }
    .button {
        border-radius: 6px;
        color: #3385FF;
    }
    .footer-divider{
        width: 100%;
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
    }
</style>