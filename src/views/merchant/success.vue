<template>
    <div class="box">
        <div class="main">
            <img :src="img">
            <p class="success">恭喜您，资料提交成功，请耐心等待审核</p>
        </div>
        <div class="center">
            <p>您还需要做以下这些</p>
        </div>
        <div class="content">
            <img :src="one">
            <span>请妥善保存您的管理后台账号和密码，勿轻易泄露给他人，可登录管理后台查看审核结果。网址：<a>http://zcpay.zanclick.cn/</a></span>
            <br>
            <span>
            <br/>账号：{{merchantNo}}
            <br/>密码：{{merchantPwd}}
            </span>
            <br/>
            <img :src="two"><span>请在审核通过后使用收款支付宝账号在支付宝APP内搜索“点赞收银台”生活号，点击菜单“商户-开通自动收款”，完成签约。</span>
        </div>
        <!--<div class="code">-->
            <!--<div class="code-licence">-->
                <!--<img :src="qr" style="width: 140px;height: 140px;">-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "success",
        data() {
            return {
                merchantNo:null,
                merchantPwd: null,
                img:require('@/assets/img/icon_complete@2x.png'),
                qr:require('@/assets/img/xieyi.png'),
                one:require('@/assets/img/img_one@2x.png'),
                two:require('@/assets/img/img_two@2x.png'),
            }
        },
        mounted() {
            this.merchantNo = this.$route.query.merchantNo;
            this.merchantPwd = this.$route.query.merchantPwd;
        }
    }
</script>

<style scoped>
    .box{
        padding: 15px;
    }
    .main{
        text-align: center;
    }
    .main img{
        width: 60px;
    }
    .center{
        width: 100%;
        height: 40px;
        background-color: #f2f5fa;
        margin-top: 30px;
        padding: 5px 0;
    }
    .center p{
        font-family: PingFang-SC-Regular;
        font-size: 13px;
        text-align: center;
        line-height: 10px;
        color: #666666;
        padding: 5px 0;
    }
    .content{
        padding: 0 15px;
    }
    .content img{
        width: 19px;
        height: 22px;
        margin-top: 20px;
        margin-bottom: 0;
        margin-right: 8px;

    }
    .content span{
        font-family: PingFang-SC-Regular;
        font-size: 15px;
        color: #081828;
        line-height: 24px;
    }
    .code{
        position: relative;
        margin: 15px 0;
    }
    .code-licence{
        width: 140px;
        height: 140px;
        margin: 0 auto;
    }

</style>
