<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="使用过程中,遇到任何问题,请联系开发人员:tomcat,联系电话:13813813838"
        />
        <van-form style="margin-top: 10px" @submit="toSearch">
            <van-field
                    v-model.trim="tradeNo"
                    clearable
                    type="text"
                    placeholder="请输入订单号"
            />
            <van-field
                    v-model.trim="phoneNo"
                    clearable
                    type="text"
                    placeholder="请输入顾客手机号"
            />
            <div style="margin: 16px;">
                <van-button class="button" block type="info" native-type="submit">
                    查询
                </van-button>
            </div>
        </van-form>
        <van-row style="margin-right: 10px" >
            <van-col >
                <span  @click="batch" v-show="batchButtonShow">批量领取</span><span  @click="batchChoose" v-show="allChoose" style="margin-left: 20px">全选</span><span  @click="cancelBatchChoose" v-show="cancelAllChoose" style="margin-left: 20px">取消全选</span><span  @click="closeAll"  v-show="closeAllShow" style="margin-left: 20px">关闭全选</span>
            </van-col>
        </van-row>
        <div class="content" style="height: 280px">
            <!--<van-empty image="search" description="暂无匹配红包" v-show="showEmpty"/>
            <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
            <div class="list" v-for="(item,index) in list" :key="item.id">


                 &lt;!&ndash;   <van-row style="border-bottom: 1px solid #E6EBF2; padding-bottom: 5px">&ndash;&gt;
                        <van-checkbox name="box" shape="square" @click="toggle(index)" ref="checkboxes" value="item.id" >
                    <van-col span="15">
                        <p>订单编号：{{item.tradeNo}}</p>
                    </van-col>
                    <van-col span="12"><h4>红包金额：<span style="font-size: 12px">￥</span>{{item.amount}}</h4></van-col>
                    <van-button type="info" plain hairline round size="small" class="btn-small" style="margin-top: 40px"
                                @click="toReceive(item)">领取
                    </van-button>
                        </van-checkbox>
               &lt;!&ndash; </van-row>&ndash;&gt;


            </div>
            </van-checkbox-group>-->
            <!--<van-empty image="search" description="暂无匹配红包" v-show="showEmpty"/>-->
            <van-checkbox-group v-model="result" ref="checkboxGroup">
            <van-cell-group>
                <van-cell
                        v-for="(item, id) in list"
                        clickable
                        :key="id"
                        :title="`序号: ${item.id}       金额:${item.amount}`  "
                        @click="toggle(id)"
                       >
                    <van-button type="info" plain hairline round size="small" class="btn-small" style="margin-right: 5px"
                                @click="toReceive(item)" >领取
                    </van-button>
                    <template #right-icon >
                        <van-checkbox :name="item" ref="checkboxes"  v-show="batchShow" :value="item.id" />
                    </template>
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>
        </div>

       <!-- <div >
            <button style="margin-bottom: 10px" @click="toWallet">我的钱包</button>
        </div>-->
        <van-button class="button" block type="info" @click="batchReceive" v-show="batchShow" >
            确认领取
        </van-button>
        <div class="footer" >
            <van-pagination  v-model="currentPage" :page-count="pageTotal" mode="simple" @change="changePage" v-show="pageButton"/>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" @click="toWallet">我的钱包</van-tabbar-item>
           <!-- <van-tabbar-item icon="search">我的钱包</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>-->
        </van-tabbar>
    </div>

</template>

<script>
    import {selectReceiver,getRedPacket,batchRedPacket} from '../../api/commission';
    import { Checkbox, CheckboxGroup } from 'vant';
    import Vue from 'vue';
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    import { Tabbar, TabbarItem } from 'vant';
    Vue.use(Tabbar);
    Vue.use(TabbarItem);
    export default {
        name: "redPacketQuery",
        data() {
            return {
                closeAllShow: false,
                active: '',
                list: [],
                showEmpty: false,
                tradeNo: '',
                phoneNo: '',
                loading: false,
                redpacket: false,
                currentPage: 0,
                pageTotal: 0,
                switch: false,
                result: [],
                toggleAll: [],
                batchShow: false,
                ids: '',
                batchButtonShow :false,
                allChoose: false,
                cancelAllChoose: false,
                pageButton: false
            }
        },
        mounted() {
            this.toSearch(this.currentPage - 1, 10);
        },
        methods: {
            toSearch: async function(cp,c) {
                let params = {};
                params.page = this.currentPage-1;
                params.tradeNo = this.tradeNo
                params.customPhone = this.phoneNo
                const result = await selectReceiver(params);
                console.log(result)
                if (result.data.code == '20000') {
                    if(result.data.data.size!=0) {
                        this.pageButton=true
                        this.showEmpty = false;
                        this.list = result.data.data.content;
                        if(this.list.length>1){
                            this.closeAllShow=true
                            this.batchButtonShow=true
                        }else{
                            this.showEmpty = true
                            this.batchButtonShow=false
                        }
                        this.pageTotal = result.data.data.totalPages;

                    }else {
                        this.showEmpty = true;
                        this.pageTotal = 0;
                        this.currentPage = 0;
                        this.list = [];
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }

            },
            toReceive(info) {
                this.$toast.loading({
                    duration:0,
                    mask: true,
                    message: '领取中...',

                });
                let params = {};
                params.id = info.id;
                getRedPacket(params).then((result)=> {
                    if(result.data.code == '20000') {
                        this.$router.push({
                            name: 'redPacketQuery',
                        })
                        this.$toast({
                            message: result.data.msg,
                        });
                    }else {
                        this.$toast({
                            message: result.data.msg,
                            icon: 'warning-o'
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'redPacketQuery',
                    })
                    this.batchShow=false
                    this.allChoose=false
                    this.cancelAllChoose=false
                    //this.batchButtonShow=false
                    /*刷新无效?*/
                    location.reload()
                })
            },
            toWallet(){
                this.$router.push({
                    name: 'wallet',
                })
            },
            changePage: function (cp) {
                this.toSearch((cp-1), 10)
            },
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            batch(){
                this.batchShow=true
                this.allChoose=true
                this.cancelAllChoose=true
            },
            batchReceive(){
                console.log(this.$refs.checkboxes)
                for( let i =0;i<this.$refs.checkboxes.length;i++){
                    //console.log(this.$refs.checkboxes[i].checked)
                    if(this.$refs.checkboxes[i].checked==true){
                        console.log(this.$refs.checkboxes[i].value)
                        this.ids=this.ids+this.$refs.checkboxes[i].value+","
                    }
                }
                let params = {};
                params.ids = this.ids;
                batchRedPacket(params).then((result)=> {

                    if(result.data.code == '20000') {
                        this.batchShow=false
                        this.allChoose=false
                        this.cancelAllChoose=false
                        this.batchButtonShow=false
                        this.$router.push({
                            name: 'redPacketQuery',
                        })
                        this.toSearch(this.currentPage - 1, 10);
                        this.$toast({
                            message: result.data.msg,
                        });
                    }else {
                        this.$toast({
                            message: result.data.msg,
                            icon: 'warning-o'
                        });
                        return;
                    }
                    this.toSearch(this.currentPage - 1, 10);
                    this.$router.push({
                        name: 'redPacketQuery',
                    })
                })
            },
            batchChoose(){
                this.$refs.checkboxGroup.toggleAll(true)
            },
            cancelBatchChoose(){
                this.$refs.checkboxGroup.toggleAll(false)
            },
            closeAll(){
                this.batchShow=false
                this.cancelAllChoose=false
                this.allChoose=false
            }
        }
    }
</script>

<style scoped>
    .box{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #F2F5FA;
        padding-left: 10px;
        padding-right: 10px;
    }
    .button {
        border-radius: 6px;
    }
    .box .header{
        height: 35px;
        margin: 5px 15px;
    }
    .box .header p{
        font-size: 13px;
        text-align: right;
        margin: 6px 0 0 ;
        color: #666666;
    }
</style>
