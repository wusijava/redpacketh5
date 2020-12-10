<template>
    <div class="box">
        <div class="content">
            <h3>设置</h3>
            <van-form class="login">
                <div style="margin: 25px 16px;">
                    <van-button round block type="info" @click="changePassword">
                        修改密码
                    </van-button>

                </div>

                <div style="margin: 25px 16px;">
                    <van-button round block type="info" @click="exit">
                        退出登录
                    </van-button>

                </div>
                <div style="margin: 25px 16px;">
                    <van-button round block type="info" @click="back">
                        返回钱包
                    </van-button>

                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    import {exit} from '../../api/user'

    export default {
        name: 'set',
        data() {
            return {
                username: '',
                password: '',
                ifDisplay: false,
                infoShow: false
            }
        },
        mounted() {

        },
        methods: {
            changePassword(){
                this.$router.push({name:'changePassword'})
            },
            back(){
                this.$router.push({name:'wallet'})
            },
            async exit(){
                const result = await exit();
                if(result.data.code == '20000') {
                    localStorage.removeItem("login_token")
                    this.$router.push({name:'login'})
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                    return;
                }
            }
        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
    }
    .box::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #ffffff;
    }
    .content{
        text-align: center;
        margin: 100px 40px;
    }
    .content h3{
        text-align: center;
        font-size: 21px;
        position: relative;
    }
    .login{
        margin-top: 80px;
    }
    .eyes-closed{
        position: absolute;
        top: 266px;
        right: 76px;
    }
    .eyes-closed img{
        height: 6px;
    }
    .eyes-open{
        position: absolute;
        top: 266px;
        right: 76px;
    }
    .eyes-open img{
        height: 12px;
    }
    .van-cell {
        padding-left: 0;
    }
    .van-cell:not(:last-child)::after{
        left: 0;
    }
</style>
