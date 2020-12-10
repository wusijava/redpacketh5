<template>
    <div class="box">
        <van-row style="margin-right: 10px" >
            <van-col >
                <p  @click="userSet">设置</p>
            </van-col>
        </van-row>
        <div class="main">
            <h3>我的钱包</h3>
        </div>
        <div style="border: 1px solid grey"> <p style="margin-left: 10px"><b>总金额:{{item.totalAmount}}</b></p>
            <p style="margin-left: 10px" ><b>可提现金额:{{item.canWithdrawAmount}}</b> <button style="margin-left: 100px;" @click="getMoney">提现</button></p>
            <p style="margin-left: 10px"><b>提现账户:{{item.receiveNo}}  </b><button style="margin-left: 80px" @click="changeAccount">更改账户</button></p>
        </div>
        <van-popup v-model="showDig"><van-cell-group v-show="showDig" round="true">
            <h3 style="text-align: center">修改提现账号</h3>
            <van-field label="支付宝账号"  v-model="account" />
            <van-field label="支付宝实名"  v-model="name" />
            <van-button type="info" @click="cancle">取消</van-button><van-button type="info"  @click="sub">确定</van-button>
        </van-cell-group></van-popup>
        <van-popup v-model="showGetMoney"><van-cell-group v-show="showGetMoney" round="true">
            <h3 style="text-align: center">红包提现</h3>
            <van-field label="提现金额"  v-model="money" />
            <van-button type="info" @click="cancleMoney">取消</van-button><van-button type="info"  @click="subGetMoney">确定</van-button>
        </van-cell-group></van-popup>

    </div>
</template>

<script>
    import {getWallet,changeAccount,transfer} from '../../api/wallet'
    import { Notify } from 'vant';
    export default {
        name: "wallet",
        data() {
            return {
                item:{
                    totalAmount :'',
                    canWithdrawAmount: '',
                    receiveNo: ''
                },
                showDig: false,
                name: '',
                account: '',
                showGetMoney: false,
                money: ''
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            userSet(){
                this.$router.push({
                    name: 'set',
                })
            },
            getInfo(){
                getWallet().then(result=>{
                    if(result.data.code === '20000') {
                            this.item=result.data.data
                    }else {
                        this.infoShow = true
                        this.$dialog.alert({
                            message:result.data.msg,
                        })
                    }
                })
            },
            changeAccount(){
                this.showDig=true
            },
            cancle(){
                this.showDig=false
            },
            sub(){
                if(this.name.length == 0) {
                    this.$toast({
                        message: '请输入支付宝实名',
                        icon: 'warning-o'
                    });
                    return;
                }
                if(this.account.length == 0) {
                    this.$toast({
                        message: '请输入提现支付宝账号',
                        icon: 'warning-o'
                    });
                    return;
                }
                let query = new Object()
                query.account = this.account
                query.name = this.name
                changeAccount(query).then(json =>{
                    if(json.data.code === '20000') {
                        Notify({ type: 'success', message: json.data.msg });
                        this.showDig=false
                        this.getInfo()
                        this.account=''
                        this.name=''
                    }else {
                        this.$dialog.alert({
                            message:json.data.msg,
                        })
                    }
                })
            },
            getMoney(){
            this.showGetMoney=true
            },
            cancleMoney(){
                this.showGetMoney=false
            },
            subGetMoney(){
                let query = new Object()
                query.money = this.money
                transfer(query).then(json =>{
                    this.$toast.loading({
                        duration:0,
                        mask: true,
                        message: '领取中...',
                    });
                    console.log(json)
                    if(json.data.code === '20000') {

                        Notify({ type: 'success', message: json.data.msg });
                        this.showGetMoney=false
                        this.getInfo()
                        this.account=''
                        this.name=''
                        this.money=''
                    }else {
                        this.$dialog.alert({
                            message:json.data.msg,
                        })
                    }
                    this.$toast.clear();
                })
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
