<template>
    <div class="box">
        <div class="content">
            <div class="content-title">
                <p>{{contractDetail.provinceName}}移动分期支付协议</p>
            </div>
            <div class="agree-content" style="margin-top: 30px">
                <p style="text-indent: 0">甲方：<span class="line" style="width: 150px;">{{contractDetail.userName}}</span></p>
                <p style="text-indent: 0">乙方：湖北点赞科技有限公司</p>
                <p>甲方是具有完全民事行为能力的自然人，因具有购买商品或服务的需求，同意办理分期业务，本协议在甲方通过{{contractDetail.provinceName}}移动授权点赞收银台（以下简称“点赞”）扫码支付确认开始生效，甲方知晓有关责任或权利限制条款，经甲方本人充分审阅，已经完全知悉并充分理解条款的内容及相应法律后果，并无疑问、分歧或异议。</p>
                <p>甲方在{{contractDetail.provinceName}}移动指定渠道门店办理分期业务，与乙方就办理和分期业务签订本协议。</p>
                <h2>一、业务内容</h2>
                <p>甲乙双方一致同意：甲方在<span class="line">{{contractDetail.merchantName}}</span>门店购买商品时，针对商品价格与商品首付金额的差额部分由甲方分期支付，乙方由此取得对于甲方应收账款，乙方分月从甲方支付宝冻结金额中分期划扣。</p>
            </div>
            <div class="agree-content" style="margin-top: 10px">
                <h2>分期服务信息卡</h2>
                <div style="margin: 0 50px">
                    <table class="table" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <th>冻结额度</th>
                            <th>冻结期数</th>
                            <th>承诺在网</th>
                            <th>扣款账单日</th>
                        </tr>
                        <tr>
                            <td>&nbsp;&nbsp;￥{{contractDetail.payAmount}}</td>
                            <td>{{contractDetail.num}}期(月)&nbsp;&nbsp;</td>
                            <td>{{contractDetail.num}}月&nbsp;&nbsp;</td>
                            <td>每月20日</td>
                        </tr>
                    </table>
                </div>
                <p v-if="numType == 0">
                    甲方办理业务号码<span class="line">{{contractDetail.userMobile}}</span>，
                    并授权乙方对其支付宝账户进行冻结，冻结金额为<span class="line">{{contractDetail.payAmount}}</span>元，
                    冻结时长为<span class="line">{{contractDetail.num}}</span>月。
                    乙方将于次月开始转支付，在每月20日从冻结金额中转支付还款<span class="line">
                    {{contractDetail.eachAmount}}</span>元，转支付<span class="line">{{contractDetail.num}}</span>次。
                </p>
                <p v-if="numType == 1">
                    甲方办理业务号码<span class="line">{{contractDetail.userMobile}}</span>，
                    并授权乙方对其支付宝账户进行冻结，冻结金额为<span class="line">{{contractDetail.payAmount}}</span>元，
                    冻结时长为<span class="line">{{contractDetail.num}}</span>月。
                    乙方将于次月开始转支付，其中第1期至34期将在每月20日从冻结金额中转支付还款{{contractDetail.eachAmount}}元，
                    第35期转支付金额为转支付还款{{contractDetail.lastAmount}}元，转支付<span class="line">35</span>次。
                </p>
                <h2>二、各方权利和义务</h2>
                <p>1、甲方同意乙方每月从冻结金额中转支付划款，用于分期还款。甲方申请办理本业务，已知晓并授权乙方在上述业务范围内使用甲方提供的个人信息及相关文件。</p>
                <p>2 、乙方为甲方提供本业务服务，就申请的本业务提供业务咨询、信息技术等相关服务。</p>
                <h2>三、退货结束业务</h2>
                <p>1、在业务存续期限内，从业务办理成功当天开始，7天内（含）若商品出现质量问题，甲方需要退货并提前结束业务, 可到办理门店申请免费取消和分期业务。</p>
                <p>2、在本次分期生效后超过14天的，本业务无法取消，可到店申请提前还款，申请提前还款后，您的支付宝内冻结金额会全部转支付，若冻结的支付宝相关账户权益是花呗额度，则转支付后的花呗账单还款即可，若冻结的是非花呗额度，则无需向花呗还款。</p>
                <h2>四、争议解决</h2>
                <p>本协议在履行过程中发生争议，可以通过协商解决；协商不成，双方均同意提请乙方所在地的仲裁委员会仲裁,按照申请仲裁时现行有效的网络仲裁规则进行网络仲裁并进行书面审理。败诉方应承担为解决本争议而产生的所有费用，包括但不限于仲裁费、律师费、公证费、交通费等。</p>
                <van-row style="margin-top: 10px">
                    <van-col span="9">
                        <img
                            :src="companySignImg"
                            class="companySignImg"
                        />
                    </van-col>
                    <van-col span="15">
                        <div class="sign-content">
                            <p style="line-height: 60px;height: 60px;display: inline-block;float: left;">
                                签名：
                            </p>

                            <button v-if="signImg == ''" class="sign-btn" @click="show = true">点击去签名</button>

                            <div class="sign-img" v-if="signImg != ''">
                                <img :src="signImg"
                                     class="rotate"
                                />
                            </div>
                        </div>

                    </van-col>
                </van-row>
                <van-row style="margin-bottom: 10px;">
                    <van-col span="9">
                    </van-col>
                    <van-col span="15">
                        <p>日期：<span class="line">{{contractDetail.year}}</span>年
                            <span class="line">{{contractDetail.month}}</span>月
                            <span class="line">{{contractDetail.day}}</span>日
                        </p>
                    </van-col>
                </van-row>
            </div>

            <van-popup v-model="show" style="width: 100%;height: 100%;text-align: center">
                <div class="wrapper">
                    <div class="sign">
                        <div style="border:1px solid #cccccc; margin: 5px;">
                            <vue-esign ref="esign" :width="screenWidth" :height="showHeight" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
                        </div>
                        <div class="btn">
                            <button @click="handleGenerate">确认签字</button>
                            <button @click="handleReset">重新签名</button>
                            <button @click="back">返回</button>
                        </div>
                    </div>
                </div>
            </van-popup>

            <div class="footer">
                <button type="button" class="gray" id="btn" @click="createPay" :disabled="disabled">
                    我已认真阅读并同意以上条款内容{{content}}
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    import * as qiniu from 'qiniu-js';
    import {getUploadToken} from "../../api/upload";
    import {create, queryContract, saveContract} from "../../api/trade";

    export default {
        name: 'payment-agreement',
        data(){
            return {
                tradeNo: '',
                outOrderNo: '',
                lineWidth: 4,
                lineColor: '#000000',
                bgColor: '',
                resultImg: '',
                isCrop: false,
                content: '(10s)',
                totalTime: 10,
                disabled: true,
                alipays: '',
                signImg: '',
                contractDetail:{},
                numType: 0,
                userNameImg: null,
                companySignImg: require('@/assets/img/company_sign.png'),
                agree: false,
                signSaveSuccess: false,
                pay: null,
                show: false,
                screenWidth: document.body.clientWidth, // 屏幕宽度
                docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
                showHeight: document.documentElement.clientHeight - 160,   //实时屏幕高度
                hidshow: true
            }
        },
        mounted(){
            this.outTradeNo = this.$route.query.outTradeNo;
            this.queryContract();
            this.timer();
            window.onresize = () => {
                return (() => {
                    let that = this;
                    window.fullHeight = document.documentElement.clientHeight;
                    that.showHeight = window.fullHeight;
                })()
            };
        },
        watch: {
            showHeight (val) {
                let that = this;
                that.show2 = true;
                if (that.docmHeight > val){
                    that.hidshow = false;
                } else{
                    that.hidshow = true;
                }
            }
        },
        methods: {
            async queryContract(){
                let params = {};
                params.outTradeNo = this.outTradeNo;
                const result = await queryContract(params);
                if(result.data.code=="20000"){
                    this.contractDetail = result.data.data
                    if (this.contractDetail.numType != undefined && this.contractDetail.numType != null) {
                        this.numType = this.contractDetail.numType
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },

            handleReset () {
                this.$refs.esign.reset()
            },

            dataURLtoBlob: function(dataurl) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            },
            blobToFile: function(theBlob, fileName){
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            },
            //保存签名
            handleGenerate () {
                this.show = false
                this.$refs.esign.generate().then(async res => {
                    this.resultImg = res

                    let blob = this.dataURLtoBlob(res);
                    let file = this.blobToFile(blob, this.getFileName(this.contractDetail.userMobile));
                    let data = await this.getUploadToken("alipays");

                    if (data) {
                        let url = data.host + data.key;
                        this.userNameImg = url;
                        this.uploadToQiniu(file, data.token, data.key, url, "alipays");
                    }
                }).catch(err => {
                    console.log(err)
                    this.$dialog.alert({
                        message: '没有签名内容',
                    });
                })
            },
            //判断返回值不为空
            getFileName: function(str) {
                let fileName = '';
                let randomStr = this.createRandom(6);
                if(str == undefined || str == null || str == '') {
                    fileName = randomStr;
                }else {
                    fileName = str + randomStr;
                }
                return fileName;
            },
            async getUploadToken(type) {
                let result = await getUploadToken({outOrderNo: this.outTradeNo, type: type});
                let data = result.data;
                if (data.code == "20000") {
                    return data.data;
                } else {
                    this.$dialog.alert({
                        message: data.msg,
                    });
                }
            },
            async uploadToQiniu(file, token, key, url, type) {
                let config = {
                    useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                    region: qiniu.region.z2     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
                };
                let putExtra = {
                    fname: file.name,  //文件原文件名
                    params: {}, //用来放置自定义变量
                    mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                };
                let observable = qiniu.upload(file, key, token, putExtra, config);

                observable.subscribe({
                    next: (result) => {
                        // 主要用来展示进度
                        console.log(result)
                    },
                    error: (errResult) => {
                        // 失败报错信息
                        console.log(errResult)
                        this.$dialog.alert({
                            message: '签名上传失败，请重试',
                        });
                    },
                    complete: (result) => {
                        // 接收成功后返回的信息
                        this[type] = url;
                        setTimeout(this.toSaveContract(), 1000);
                    }
                })

            },
            //倒计时
            timer() {
                this.time = setInterval(() => {
                    document.getElementById("btn").style.backgroundColor = "gray";
                    this.totalTime--;
                    this.content = '(' + this.totalTime + 's'+ ')';

                    if (this.totalTime <= 0) {
                        clearInterval(this.time);
                        this.totalTime = 10;
                        this.content = '';
                        document.getElementById("btn").style.backgroundColor = "#3385ff";
                        document.getElementById("btn").disabled = false;
                        this.agree = true;
                    }
                }, 1000)
            },
            async toSaveContract() {
                let params = {};
                params.outOrderNo = this.outTradeNo;
                params.userNameImg = this.userNameImg;
                params.userMobile = this.contractDetail.userMobile;
                this.$toast.loading({
                    duration:0,
                    mask: true,
                    message: '请稍后...',

                });
                const result = await saveContract(params);
                this.$toast.clear();
                if(result.data.code == '20000') {
                    this.signSaveSuccess = true;
                    this.$toast({
                        message: result.data.data,
                        icon: 'success'
                    });
                    this.signImg = this.userNameImg;
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            async createPay(){
                if (!this.agree){
                    this.$dialog.alert({
                        message: "请阅读并同意协议"
                    });
                    return;
                }
                if (!this.userNameImg){
                    this.$dialog.alert({
                        message: "请您签名后提交"
                    });
                    return;
                }
                if (!this.signSaveSuccess){
                    this.$dialog.alert({
                        message: "签名保存失败，请重新保存"
                    });
                    return;
                }
                let params = {};
                params.outTradeNo = this.outTradeNo
                this.$toast.loading({
                    duration:0,
                    mask: true,
                    message: '请稍后...',
                });
                const result = await create(params);
                this.$toast.clear();
                if(result.data.code == '20000'){
                    let qrCodeUrl = result.data.data.qrCodeUrl;
                    window.location.href = qrCodeUrl;
                }else {
                    this.$dialog.alert({
                        message: result.data.msg,
                    });
                }
            },
            createRandom() {
                let random = "";
                let randomLength = 6;
                let randomList = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                    'S','T','U','V','W','X','Y','Z');
                for(let i = 0; i < randomLength; i++) {
                    let index = Math.floor(Math.random()*36);
                    random += randomList[index];
                }
                return random;
            },
            back() {
                this.show = false;
            }
        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
        background: #ffffff;
    }
    .content {
        padding: 10px 10px 20px 10px;
        color: #2c3e50;
    }
    .content-title p {
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #2c3e50;
    }
    .content .agree-title, .agree-title2 {
        margin-top: 25px;
    }
    .content .agree-content p {
        font-size: 6px;
        margin-bottom: 0;
        margin-top: 5px;
        text-indent: 2em;
        text-align: justify;
        color: #2c3e50;
        line-height: 12px;
    }
    .content .agree-content h4 {
        font-size: 14px;
        margin-bottom: 0;
        margin-top: 5px;
        color: #2c3e50;
    }
    .content .agree-content h2 {
        font-size: 8px;
        margin-bottom: 0;
        margin-top: 5px;
        color: #2c3e50;
    }
    .agree-content .table {
        border-top: 1px solid #8B8989;
        border-left: 1px solid #8B8989;
        width: 100%;
        margin-top: 10px;
    }
    .agree-content .table th, .table td{
        border-right: 1px solid #8B8989;
    }
    .table td {
        background-color: #fff;
        -webkit-transition: background-color .2s ease-in-out;
        transition: background-color .2s ease-in-out;
    }
    .agree-content .table th {
        font-size: 6px;
        text-align: center;
    }
    .agree-content .table td, .table th  {
        min-width: 0;
        height: 25px;
        box-sizing: border-box;
        text-align: center;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #8B8989;
    }
    .agree-content .table td {
        font-size: 6px;
        text-align: center;
    }
    .agree-content input {
        border-bottom: 1px solid #2c3e50;
        border-top: 0;
        border-left: 0;
        border-right: 0;
    }
    .agree-content .line {
        display: inline-block;
        border-bottom: 1px solid #8B8989;
        position: relative;
        bottom:0;
        text-indent: 0;
        padding: 0 5px;
    }
    .van-button--normal {
        padding: 0 15px;
        font-size: 14px;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .box .sign {
        background-color: #ffffff;
        height: 100%;
    }
    .sign .btn {
        margin-top: 40px;
    }
    .sign .btn button{
        background-color: #ffffff;
        border-radius: 6px;
        border: 1px solid #3385ff;
        width: 110px;
        height: 45px;
        color: #3385ff;
        font-size: 17px;
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); /* Internet Explorer */
        -moz-transform:rotate(90deg); /* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); /* Opera */
    }
    .footer {
        padding: 0 10px 50px 10px;
    }
    .footer .gray {
        background-color: #808080;
        border-radius: 6px;
        border: none;
        width: 100%;
        height: 50px;
        color: #ffffff;
        font-size: 17px;
        margin-top: 30px;
    }
    .sign-content {
        width:100%;
        height:100px;
    }
    .sign-img {
        width:150px;
        height:100px;
        position: relative;
        top: 0px;
        left: 20%;
    }
    .sign-img img[src='']{
        border: none;
    }
    .rotate {
        width:60px;
        height:100px;
        transform:rotate(270deg);
        -ms-transform:rotate(270deg); /* Internet Explorer */
        -moz-transform:rotate(270deg); /* Firefox */
        -webkit-transform:rotate(270deg); /* Safari 和 Chrome */
        -o-transform:rotate(270deg); /* Opera */
    }
    .signImg {
        width:150px;
        height:45px;
    }
    .sign-btn {
        float: left;
        border:1px dashed #bbbbbb;
        width: 150px;
        height: 100px;
        color: #8a8a8a;
        background-color: #ffffff;
    }
    .companySignImg {
        width:100px;
        height:100px;
        border: none;
        position: relative;
        top: -10px;
        left: 10px;
        z-index: 99;
    }
</style>