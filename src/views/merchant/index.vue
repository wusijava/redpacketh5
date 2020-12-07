<template>
    <div class="box" v-if="showForm===true">
        <div class="box2">
            <van-cell-group>
                <van-field
                        v-model.trim="form.wayId"
                        placeholder="请输入网点渠道编码"
                        clearable
                        :clickable="false"
                        input-align="right"
                        label-width="110"
                        label="网点渠道编码"
                >
                </van-field>
                <van-field
                        v-model.trim="form.storeSubjectCertNo"
                        clearable
                        :clickable="false"
                        placeholder="请输入营业执照编号"
                        input-align="right"
                        label-width="110"
                        label="营业执照编号"
                >
                </van-field>

                <van-field
                        v-model.trim="form.storeSubjectName"
                        clearable
                        :clickable="false"
                        placeholder="请输入营业执照名称"
                        input-align="right"
                        label-width="110"
                        label="营业执照名称"
                >
                </van-field>

                <van-cell
                        v-if="area == '请选择营业执照地址'"
                        title="营业执照地址"
                        is-link
                        :value="area"
                        @click="getAreaList"
                />

                <van-field
                        v-else
                        is-link
                        :value="area"
                        @click="showArea = true"
                        input-align="right"
                        label-width="110"
                        label="营业执照地址"
                >
                </van-field>

                <van-popup
                        v-model="showArea"
                        position="bottom"
                        :style="{ height: '50%' }"
                >
                    <zc-area :area-list="areaList"
                              value="420102"
                              @confirm="confirmArea"
                              @cancel="showArea=false"
                    />
                </van-popup>

                <van-field
                        v-model.trim="form.address"
                        clearable
                        :clickable="false"
                        placeholder="请输入详细地址"
                        input-align="right"
                        label-width="110"
                        label="详细地址"
                >
                </van-field>

                <van-field
                        v-model.trim="form.storeLegalPerson"
                        clearable
                        :clickable="false"
                        placeholder="请输入经营者/法人"
                        input-align="right"
                        label-width="110"
                        label="经营者/法人"
                >
                </van-field>

                <van-field
                        v-model.trim="form.contactName"
                        clearable
                        :clickable="false"
                        label="联系人"
                        placeholder="请输入联系人"
                        input-align="right"
                        label-width="110"
                >
                </van-field>

                <van-field
                        v-model.trim="form.contactPhone"
                        type="tel"
                        maxlength="11"
                        clearable
                        :clickable="false"
                        placeholder="请输入联系电话"
                        input-align="right"
                        label-width="110"
                        label="联系电话"
                >
                </van-field>
            </van-cell-group>
        </div>

        <div class="box2">
            <van-cell-group>
                <van-field
                        v-model.trim="form.userName"
                        type="tel"
                        maxlength="11"
                        clearable
                        :clickable="false"
                        placeholder="请输入商户登录手机号"
                        input-align="right"
                        label-width="110"
                        label="商户登录账号"
                >
                </van-field>
                <van-field
                        v-model.trim="form.password"
                        clearable
                        :clickable="false"
                        placeholder="请输入登录密码"
                        input-align="right"
                        label-width="110"
                        label="商户登录密码"
                >
                </van-field>
            </van-cell-group>
        </div>

        <div class="box2">
            <van-cell-group>
                <van-cell
                        v-if="type == '请选择支付宝类型'"
                        title="支付宝类型"
                        is-link
                        :value="type"
                        @click="showPicker = true">
                </van-cell>

                <van-field
                        v-else
                        is-link
                        :value="type"
                        @click="showPicker = true"
                        input-align="right"
                        label-width="110"
                        label="支付宝类型"
                />

                <van-popup
                        v-model="showPicker"
                        position="bottom"
                >
                    <van-picker
                            show-toolbar
                            :columns="columns"
                            @cancel="showPicker = false"
                            @confirm="onConfirm"
                    />
                </van-popup>

                <van-field
                        v-model.trim="form.aliPayNo"
                        clearable
                        :clickable="false"
                        placeholder="请输入支付宝账号"
                        input-align="right"
                        label-width="110"
                        label="支付宝账号"
                >
                </van-field>
            </van-cell-group>
        </div>

        <div class="box2" style="margin: 15px">
            <div class="agreement">
                <p>查看
                    <span style="color: #3385ff" @click="checkAgreement(form)">《服务协议》</span>
                </p>
            </div>
            <van-button class="button" @click="submit" type="info" size="large" :loading="loading">同意协议并提交</van-button>
        </div>
    </div>

    <div v-else-if="showForm === false">

    </div>
    <div v-else style="margin-top: 40%">
        <van-loading type="spinner" color="#1989fa"/>
    </div>
</template>

<script>
    import {submit} from '../../api/merchant'
    import {getAreaList} from '../../api/area'
    import ZcArea from '../../components/ZcArea'

    export default {
        name: "merchantIndex",
        components:{
            ZcArea:ZcArea
        },
        data() {
            return {
                appId: '',
                area: '请选择营业执照地址',
                showArea: false,
                loading: false,
                cipherJson: '',
                areaList: [],
                showPicker: false,
                type: '请选择支付宝类型',
                columns: ['个人', '企业'],
                form: {
                    aliPayType: '',//支付类型
                    aliPayNo: '',//支付宝账号
                    wayId: '', //渠道编码
                    storeLegalPerson: '',//法人
                    contactName: '',//联系人姓名
                    contactPhone: '',//联系人电话
                    storeSubjectName: '',//营业执照名称
                    storeSubjectCertNo: '',//营业执照编号
                    storeProvince: '',//省
                    storeProvinceCode: '',
                    storeCity: '',//市
                    storeCityCode: '',
                    storeCounty: '',//区
                    storeCountyCode: '',
                    address: '',//详细地址
                    userName: '',//登录用户名
                    password: '',//登录密码
                },
                showForm: true
            }
        },
        mounted() {
        },
        methods: {
            async getAreaList() {
                this.showArea = true;
                const result = await getAreaList();
                if(result.data.code == '20000') {
                    this.areaList = result.data.data
                }
            },
            onConfirm(value) {
                if(value == '个人') {
                    if(this.form.storeLegalPerson == null || this.form.storeLegalPerson == '') {
                        this.$toast({
                            message: '经营者/法人不能为空',
                            icon: 'warning-o'
                        });
                    } else {
                        this.type = value;
                        this.form.aliPayType = 0;
                    }
                }else {
                    if(this.form.storeSubjectName == null || this.form.storeSubjectName == '') {
                        this.$toast({
                            message: '营业执照名称不能为空',
                            icon: 'warning-o'
                        });
                    } else {
                        this.type = value;
                        this.form.aliPayType = 1;
                    }
                }
                this.showPicker = false;
            },
            async submit() {
                if(this.form.contactPhone.length != 11) {
                    this.$toast({
                        message: '请输入正确的联系电话',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.form.userName.length != 11) {
                    this.$toast({
                        message: '请输入正确的手机号',
                        icon: 'warning-o'
                    });
                    return;
                }
                this.loading = true;
                try {
                    const result = await submit(this.form);
                    this.loading = false;
                    if (result.data.code != '20000') {
                        this.$toast({
                            message: result.data.msg,
                            icon: 'warning-o'
                        });
                    } else {
                        this.$toast({
                            message: result.data.data,
                            icon: 'clock-o'
                        });
                        this.$router.push({
                            name: 'merchantSuccess',
                            query: {merchantNo: this.form.userName, merchantPwd: this.form.password}
                        })
                    }
                } catch (e) {
                    this.loading = false;
                }
            },
            confirmArea(arr) {
                this.area = '';
                if (arr[0]) {
                    this.area += arr[0].name;
                    this.form.storeProvince = arr[0].name;
                    this.form.storeProvinceCode = arr[0].code;
                }
                if (arr[1]) {
                    this.area += '-' + arr[1].name;
                    this.form.storeCity = arr[1].name;
                    this.form.storeCityCode = arr[1].code;
                }
                if (arr[2]) {
                    this.area += '-' + arr[2].name;
                    this.form.storeCounty = arr[2].name;
                    this.form.storeCountyCode = arr[2].code;
                }
                this.showArea = false;
            },
            checkAgreement(form) {
                if(this.form.storeProvince == '' || this.form.storeProvince == null) {
                    this.$toast({
                        message: '请先选择营业执照地址',
                        icon: 'warning-o'
                    });
                    return;
                }
                this.$router.push({
                    name: 'serviceAgreement',
                    query: {
                        storeSubjectName: form.storeSubjectName,
                        storeProvince: form.storeProvince
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .box, .box2 {
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
        border-radius: 3px;
    }
    .agreement {
        position: relative;
    }
    .agreement p {
        color: #323233;
        font-size: 13px;
    }
    .agreement span {
        color: #3385ff;
    }
</style>
