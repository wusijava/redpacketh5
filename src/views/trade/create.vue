<template>
    <div class="box" v-if="showForm===true">
        <van-cell-group>
            <van-cell
                    :title="detail.name"
                    :label="detail.desc"
                    title-class="title"
            />
            <van-field
                    v-model="detail.payAmt"
                    clearable
                    :clickable="false"
                    :placeholder="detail.payAmt"
                    input-align="right"
                    label-width="110"
                    label="冻结金额"
                    readonly
            >
            </van-field>
            <van-field
                    v-model="detail.num"
                    clearable
                    :clickable="false"
                    type="digit"
                    :placeholder="detail.num + '期'"
                    input-align="right"
                    label-width="110"
                    label="套餐期数"
                    readonly
            >
            </van-field>
            <van-field
                    v-model.trim="customerName"
                    clearable
                    :clickable="false"
                    placeholder="请输入客户姓名"
                    input-align="right"
                    label-width="110"
                    label="客户姓名"
            >
            </van-field>
            <van-field
                    v-model.trim="customerPhone"
                    clearable
                    :clickable="false"
                    type="tel"
                    maxlength="11"
                    placeholder="请输入办理业务手机号"
                    input-align="right"
                    label-width="110"
                    label="客户手机号"
            >
            </van-field>
            <van-field
                    v-model.trim="customerCertNo"
                    clearable
                    :clickable="false"
                    maxlength="18"
                    placeholder="请输入身份证号"
                    input-align="right"
                    label-width="110"
                    label="客户身份证号"
            >
            </van-field>

            <van-cell
                    v-if="cashier == '请选择营业员'"
                    title="选择营业员"
                    is-link
                    :value="cashier"
                    @click="showCashier">
            </van-cell>

            <van-field
                    v-else
                    is-link
                    :value="cashier"
                    @click="showCashier"
                    input-align="right"
                    label-width="110"
                    label="选择营业员"
            />

            <van-popup
                    v-model="showPicker"
                    position="bottom"
            >
                <van-picker
                        v-model="cashier"
                        show-toolbar
                        :columns="cashierList"
                        value-key="name"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                />
            </van-popup>
        </van-cell-group>

        <div class="box2" style="margin: 15px">
            <van-button class="button" @click="submit" type="info" size="large" :loading="loading">确认并收款</van-button>
        </div>
    </div>

    <div v-else-if="showForm === false">

    </div>
    <div v-else style="margin-top: 40%">
        <van-loading type="spinner" color="#1989fa"/>
    </div>
</template>

<script>
    import {getCashierList,createOrder} from '../../api/trade'

    export default {
        name: "create",
        data() {
            return {
                loading: false,
                showForm: true,
                detail: {},
                customerName: '',
                customerPhone: '',
                customerCertNo: '',
                showPicker: false,
                cashier: '请选择营业员',
                cashierCode: '',
                cashierList: [],
                storeNo:  JSON.parse(localStorage.getItem('store')).storeNo,
                wayId:  JSON.parse(localStorage.getItem('store')).wayId,
                tradeNo: ''
            }
        },
        mounted() {
            this.detail = JSON.parse(localStorage.getItem('info'))
        },
        methods: {
            showCashier() {
                let params = {}
                params.storeNo = this.storeNo
                getCashierList(params).then(result =>{
                    if(result.data.code == '20000') {
                        this.cashierList = result.data.data
                        if(this.cashierList.length > 0) {
                            this.showPicker = true
                        }else {
                            this.showPicker = false
                            this.$toast({
                                message: '请先在门店管理后台添加收银员',
                                icon: 'warning-o'
                            });
                        }
                    }else{
                        this.$toast({
                            message: result.data.msg,
                            icon: 'warning-o'
                        });
                    }
                })
            },
            onConfirm(value) {
                this.cashier = value.name;
                this.cashierCode = value.id;
                this.showPicker = false;
            },
            async submit() {
                let params = {};
                if(this.customerName == '' || this.customerName == null) {
                    this.$toast({
                        message: '客户姓名不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.customerPhone == '' || this.customerPhone == null) {
                    this.$toast({
                        message: '客户手机号不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                let phone = /^1[3456789]\d{9}$/;
                if(phone.test(this.customerPhone) === false) {
                    this.$toast({
                        message: '手机号格式不正确',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.customerCertNo == '' || this.customerCertNo == null) {
                    this.$toast({
                        message: '身份证号不能为空',
                        icon: 'warning-o'
                    });
                    return;
                }
                // 身份证号校验
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(reg.test(this.customerCertNo) === false) {
                    this.$toast({
                        message: '身份证输入不合法',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.cashierCode == '' || this.cashierCode == null) {
                    this.$toast({
                        message: '请选择营业员',
                        icon: 'warning-o'
                    });
                    return;
                }
                params.mealId = this.detail.id
                params.customerName = this.customerName
                params.customerPhone = this.customerPhone
                params.customerCertNo = this.customerCertNo
                params.cashierId = this.cashierCode
                params.wayId = this.wayId
                params.storeNo = this.storeNo

                const result = await createOrder(params)
                if(result.data.code == '20000') {
                    this.tradeNo = result.data.data.tradeNo
                    this.$router.push({name:'pay', query:{tradeNo: this.tradeNo}});
                }else{
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
    .box2 {
        margin-top: 10px;
    }
    .box::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #F2F5FA;
    }
    .button {
        border-radius: 6px;
    }
    .title {
        font-size: 1.125rem;
    }
    .upload-left {
        padding: 10px 16px;
    }
    .upload-left .upload-title {
        font-size: 14px;
        color: #646566;
        text-align: left;
    }
    .upload-left .upload-label {
        font-size: 12px;
        color: #3385ff;
        text-align: left;
    }
    .upload-right {
        padding: 20px 20px 10px 20px;
    }
    .img-upload {
        float: right;
        border:1px dashed #bbbbbb;
        width: 80px;
        height: 80px;
        color: #8a8a8a;
        background-color: #ffffff;
    }
    .sign-img {
        width: 80px;
        height: 80px;
        float: right;
    }
    .sign-img img {
        width:80px;
        height:80px;
        float: right;
    }
    .sign-img img[src='']{
        border: none;
    }
    .mini-font {
        font-size: 12px;
        text-align: right;
        margin-top: 0;
        margin-right: 20px;
        color: #969799;
    }
</style>
