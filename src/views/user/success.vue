<template>
    <div class="box">
        <div class="main">
            <img :src="img">
            <p class="success">恭喜您，注册成功!</p>
        </div>
        <div class="center">
            <p>您还需要做以下这些</p>
        </div>
        <div class="content">
            <img :src="one">
            <span>请妥善保存您的红包平台账号和密码:</span>
            <br>
            <span>
            <br/>账号：{{merchantNo}}
            <br/>密码：{{merchantPwd}}
            </span>
            <br/>

        </div>
        <button @click="login" style="margin-left: 150px;margin-top: 50px">点此登录</button>
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
        },
        methods: {
            login(){
                this.$router.push({name:'login'})
            }
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
