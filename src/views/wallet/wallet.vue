<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="使用过程中,遇到任何问题,请联系开发人员:tomcat,联系电话:13813813838"
        />
        <van-row style="margin-right: 10px" >
            <van-col >
                <p  @click="userSet">设置</p>
            </van-col>
        </van-row>
        <div class="main">
            <h3>我的钱包</h3>
        </div>
        <div style="border: 1px solid  deepskyblue ;margin-bottom: 10px;border-radius: 10px" > <p style="margin-left: 10px"><b>总金额:{{item.totalAmount}}</b></p>
            <p style="margin-left: 10px" ><b>可提现金额:{{item.canWithdrawAmount}}</b> <van-button style="margin-left: 100px;" @click="getMoney" type="primary">提现</van-button></p>
            <p style="margin-left: 10px"><b>提现账户:{{item.receiveNo}}  </b><van-button style="margin-left: 80px" @click="changeAccount" type="primary">更改账户</van-button></p>
        </div>
        <van-popup v-model="showDig"><van-cell-group v-show="showDig" round="true">
            <h3 style="text-align: center">修改提现账号</h3>
            <van-field label="支付宝账号:"  v-model="account" />
            <van-field label="支付宝实名:"  v-model="name" />
            <van-button type="info" @click="cancle" size="mini" style="margin-left: 20px;margin-right: 70px;margin-bottom: 10px">取消</van-button><van-button type="info"  @click="sub" size="mini">确定</van-button>
        </van-cell-group></van-popup>
        <van-popup v-model="showGetMoney"><van-cell-group v-show="showGetMoney" round="true">
            <h3 style="text-align: center">红包提现</h3>
            <van-field label="提现金额"  v-model="money" />
            <van-button type="info" @click="cancleMoney" style="margin-right: 50px;margin-left: 20px;margin-bottom: 10px">取消</van-button><van-button type="info"  @click="subGetMoney" >确定</van-button>
        </van-cell-group></van-popup>
        <van-button type="info" @click="receiveList()" style="margin-right: 180px">领取明细</van-button><van-button type="info" @click="getTransferList()">提现明细</van-button>
        <div class="content" style="border-radius: 10px;border: #3385ff solid 1px;margin-top: 10px">
            <div class="list" v-for="(item,index) in list" :key="item.id" >


                    <van-row style="border-bottom: 1px solid #E6EBF2; padding-bottom: 5px">
                    <van-col >
                        <p>领取时间:{{item.createTime}}</p>
                    </van-col>
                    <van-col span="12" style="width: 400px"><h4>红包金额：<span style="font-size: 8px">￥</span>{{item.amount}}  {{item.settleDesc}}  {{item.receiveNo}}</h4></van-col>

                </van-row>


            </div>
        </div>
        <div class="footer" >
            <van-pagination  v-model="currentPage" :page-count="pageTotal" mode="simple" @change="changePage" />
        </div>
    </div>
</template>

<script>
    import {getWallet,changeAccount,transfer,getReceiveList} from '../../api/wallet'
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
                money: '',
                list: [],
                currentPage: 0,
                pageTotal: 0,
                type: 1
            }
        },
        mounted() {
            this.getInfo();
            this.getReceiveList(this.currentPage - 1, 10);
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
            },
            getReceiveList(cp,c){
                let params = {};
                params.page = this.currentPage-1;
                params.type=this.type
                getReceiveList(params).then((result)=> {
                    if(result.data.code == '20000') {
                        this.list = result.data.data.content;
                        this.pageTotal = result.data.data.totalPages;
                    }else {
                        this.$toast({
                            message: result.data.msg,
                            icon: 'warning-o'
                        });
                        return;
                    }
                })
            },
            changePage: function (cp) {
                this.getReceiveList((cp-1), 10)
            },
            getTransferList(cp){
                this.currentPage=1
                this.type=2
                this.getReceiveList((cp-1), 10)
            },
            receiveList(cp){
                this.currentPage=1
                this.type=1
                this.getReceiveList((cp-1), 10)
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
