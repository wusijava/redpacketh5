<template>
    <div class="box" v-if="showForm===true">
        <div class="box2">
            <van-cell-group>
                <van-field
                        v-model.trim="form.userName"
                        placeholder="请输入用户名"
                        clearable
                        :clickable="false"
                        input-align="right"
                        label-width="110"
                        label="用户名"
                >
                </van-field>
                <van-field
                        v-model.trim="form.password"
                        clearable
                        :clickable="false"
                        placeholder="请输入登录密码"
                        input-align="right"
                        label-width="110"
                        label="登录密码"
                >
                </van-field>
                <van-field
                        v-model.trim="form.passwordConfirm"
                        clearable
                        :clickable="false"
                        placeholder="请确认登录密码"
                        input-align="right"
                        label-width="110"
                        label="确认登录密码"
                >
                </van-field>
            </van-cell-group>
        </div>

        <div class="box2" style="margin: 15px">

            <van-button class="button" @click="submit" type="info" size="large" :loading="loading">提交注册</van-button>
        </div>
    </div>

    <div v-else-if="showForm === false">

    </div>
    <div v-else style="margin-top: 40%">
        <van-loading type="spinner" color="#1989fa"/>
    </div>
</template>

<script>
    import {register} from '../../api/user'

    export default {
        name: "register",
        data() {
            return {
                loading: false,
                form: {
                    userName: '',//登录用户名
                    password: '',//登录密码
                    passwordConfirm: '' //确认登录密码
                },
                showForm: true
            }
        },
        mounted() {
        },
        methods: {
            async submit() {
                if(this.form.userName.length == 0) {
                    this.$toast({
                        message: '请输入用户名',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.form.password.length == 0) {
                    this.$toast({
                        message: '请输入密码',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.form.passwordConfirm.length == 0) {
                    this.$toast({
                        message: '请输入确认密码',
                        icon: 'warning-o'
                    });
                    return;
                }
                this.loading = true;
                try {
                    const result = await register(this.form);
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
                            name: 'registerSuccess',
                            query: {merchantNo: this.form.userName, merchantPwd: this.form.password}
                        })
                    }
                } catch (e) {
                    this.loading = false;
                }
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
