<template>
    <div class="box">
        <div class="content">
            <h3>修改密码</h3>
            <van-form @submit="change" class="login">
                <van-field
                        v-model="oldPassword"
                        name="账号"
                        placeholder="请输入旧密码"
                        clearable
                />
                <div>
                    <van-field
                            v-model="password"
                            type="text"
                            name="密码"
                            placeholder="请输入新密码"
                            clearable
                    />
                </div>
                <div >
                    <van-field
                            v-model="passwordConfirm"
                            type="text"
                            name="密码"
                            placeholder="请确认新密码"
                            clearable
                    />
                    <span class="eyes-open" @click="ifDisplay = !ifDisplay">
                    </span>
                </div>
                <div style="margin: 25px 16px;">
                    <van-button round block type="info" native-type="submit">
                        保存
                    </van-button>

                </div>

            </van-form>
        </div>

    </div>
</template>

<script>
    import {change} from '../../api/user'

    export default {
        name: 'changePassword',
        data() {
            return {
                oldPassword: '',
                password: '',
                passwordConfirm: ''
            }
        },
        mounted() {

        },
        methods: {
            change(){
                if(this.oldPassword == '' || this.password == ''||this.passwordConfirm =='') {
                    this.infoShow = true
                    this.$dialog.alert({
                        message:'信息不完整!',
                    })
                }else{
                    let query = new Object()
                    query.oldPassword = this.oldPassword
                    query.password = this.password
                    query.passwordConfirm = this.passwordConfirm
                    change(query).then(json =>{
                        if(json.data.code === '20000') {
                            this.$dialog.alert({
                                message:'修改成功,请重新登录!',
                            })
                            localStorage.removeItem('login_token');
                            this.$router.push({name:'login'})
                        }else {
                            this.infoShow = true
                            this.$dialog.alert({
                                message:json.data.msg,
                            })
                        }
                    })
                }

                console.log(345)
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
