<template>
    <div class="box">
        <div class="title">
            <van-row>
                <van-col span="2"><img src="../../assets/img/icon_merchant@2x.png"/></van-col>
                <van-col span="22"><h3 class="ellipsis">{{store.storeName}}</h3></van-col>
            </van-row>
            <p style="margin-top: 5px">
                {{storeProvince}}-{{storeCity}}
                <img src="../../assets/img/btn_mine_skip@3x.png"
                     style="width: 11px;height: 7px; margin-left: 5px;"
                     @click="getAreaList"
                />
            </p>
            <van-popup
                    v-model="showArea"
                    position="bottom"
                    :style="{ height: '50%' }"
            >
                <zc-area :area-list="areaList"
                         :columns-num="2"
                         :value="storeCityCode"
                         @confirm="confirmArea"
                         @cancel="showArea=false"
                />
            </van-popup>
        </div>
        <div class="content">
            <div v-show="empty" style="width: 100%;padding: 10px;text-align: center;">该地区暂无数据</div>
            <van-tabs v-if="mealList.length > 0" v-model="active" animated swipeable :scrollspy="scrollspy"
                      color="#587FFF" title-active-color="#3385ff" title-inactive-color="#2c3e50"
                      line-width="50" :ellipsis="false" @change="changeTab" ref="vanTabs">
                <van-tab v-for="(item,index) in mealList" :key="item.name" :value="item.id" :title="item.name" :name="index"
                         title-style="width: 100px;word-break:break-all;height:50px;line-height:18px;
                                      display: flex;align-items: center;justify-content: space-around;flex-direction: column;"
                >
                    <div class="radio-check" v-for="(i,index) in item.mealInfoList"
                         :class="activeState==index ? 'activeClass' : '' "
                    >
                        <input type="radio"
                               :value="index"
                               @click="changeState(index, i)"
                        >
                        <label>
                            <h2>{{i.name}}</h2>
                            {{i.desc}}
                        </label>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="footer" v-if="info != null">
            <van-row>
                <van-col span="8">
                    <h1><span>￥{{info.payAmt}}</span></h1>
                </van-col>
                <van-col span="8" style="margin-top: 12px">
                    <p>结算金额：{{info.settleAmt}}</p>
                    <p>￥{{info.eachAmt}}/期*{{info.num}}</p>
                </van-col>
                <van-col span="8">
                    <van-button type="info" size="large" block @click="toPay">下一步</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="footer" v-else>
            <van-row>
                <van-col span="8">
                    <h1><span></span></h1>
                </van-col>
                <van-col span="8" style="margin-top: 12px">
                    <p></p>
                    <p></p>
                </van-col>
                <van-col span="8">
                    <van-button type="default" size="large" block disabled>下一步</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {getStore,getMealList} from '../../api/trade'
    import {getAreaList} from "../../api/area";
    import ZcArea from '../../components/ZcArea'

    export default {
        name: "tradeIndex",
        components:{
            ZcArea:ZcArea
        },
        data() {
            return {
                store: {},
                area: '',
                showArea: false,
                areaList: [],
                storeProvince: '',
                storeProvinceCode: '',
                storeCity: '',
                storeCityCode: '',
                active: 'a',
                scrollspy: false,
                mealList:[],
                activeState: 0,
                info: {},
                empty: false
            }
        },
        mounted() {
            this.getStore();
            if(ap) {
                ap.setOptionButton({
                    items: [{
                        title: '切换账号'
                    }],
                    onClick: (data)=>{
                        ap.confirm({
                            title: '温馨提示',
                            content: '是否确认切换账号？',
                            confirmButtonText: '确认',
                            cancelButtonText: '取消'
                        }, function(result){
                            if(result.confirm === true) {
                                window.location.href = "/h5/logout?type=1"
                            }
                        });
                    }
                });
            }
        },
        methods: {
            getStore: async function() {
                let params = {};
                params.username = localStorage.getItem('username')
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await getStore(params);
                this.$toast.clear();
                if(result.data.code == '20000') {
                    this.store = result.data.data
                    this.storeProvince = result.data.data.provinceName
                    this.storeCity = result.data.data.cityName
                    this.storeProvinceCode = result.data.data.provinceCode
                    this.storeCityCode = result.data.data.cityCode
                    this.getList();
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            getList: async function() {
                let params = {};
                if(this.storeCityCode == null) {
                    params.type = 1 //1、省 2、市
                    params.areaCode = this.storeCityCode
                }else if(this.storeCityCode == this.storeProvinceCode) {
                    params.type = 1
                    params.areaCode = this.storeProvinceCode
                } else {
                    params.type = 2
                    params.areaCode = this.storeCityCode
                }
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await getMealList(params);
                this.$toast.clear();
                if (result.data.code == '20000') {
                    this.mealList = []
                    if(result.data.data.length <= 0) {
                        this.empty = true
                        this.info = null
                    }else {
                        this.empty = false
                        this.mealList = result.data.data
                        this.info = this.mealList[0].mealInfoList[0]
                        this.active = 0
                        if(this.$refs.vanTabs) {
                            this.scrollspy = true;
                            this.$refs.vanTabs.scrollTo(0)
                            this.scrollspy = false;
                        }
                        this.activeState = 0
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
                this.$nextTick()
            },
            async getAreaList() {
                this.showArea = true;
                let params = {}
                params.provinceCode = this.storeProvinceCode
                const result = await getAreaList(params);
                if(result.data.code == '20000') {
                    this.areaList = result.data.data;
                }
            },
            confirmArea(arr) {
                if (arr[0]) {
                    this.storeProvince = arr[0].name;
                    this.storeProvinceCode = arr[0].code;
                }
                if (arr[1]) {
                    this.storeCity = arr[1].name;
                    this.storeCityCode = arr[1].code;
                }
                this.showArea = false;
                this.getList();
            },
            changeState(index, item){
                //把index值赋给active，点击改变样式
                this.activeState = index;
                this.info = item
            },
            changeTab: function(name) {
                this.activeState = 0;
                this.info = this.mealList[name].mealInfoList[0]
            },
            toPay() {
                localStorage.setItem('info', JSON.stringify(this.info));
                localStorage.setItem('store', JSON.stringify(this.store))
                this.$router.push({name:'create'});
            }
        }
    }
</script>

<style scoped>
    .box::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #F2F5FA;
    }
    .title, .content {
        background: #ffffff;
        position: relative;
        padding: 10px;
        margin-bottom: 10px;
    }
    .content {
        margin-bottom: 80px;
    }
    .content >>> .van-tabs--line .van-tabs__wrap {
        height: 50px;
    }

    .title h3 {
        margin: 0 0 0 10px;
        font-size: 1.1em;
    }
    .title p {
        margin: 0 0 0 44px;
        font-size: 15px;
    }
    .title img {
        width: 33px;
        height: 33px;
        vertical-align: middle;
        display: inline-block;
    }
    .radio-label,
    .radio-check {
        display: block;
        position: relative;
        margin-top: 15px;
    }
    .radio-check input[type="radio"] {
        appearance: none; /*清除默认样式*/
        -webkit-appearance: none;
        /* opacity: 0; */
        outline: none;
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 50%;
        background: #ffffff;
    }
    .radio-check input[type="radio"] {
        opacity: 0;
    }
    .radio-check label {
        display: block;
        height: 100%;
        font-size: 0.75rem;
        line-height: 24px;
        text-align: left;
        border: 1px solid #E3E3E3;
        background-color: #ffffff;
        border-radius: 5px;
        padding: 10px;
    }
    .radio-check input[type="radio"]:checked + label + h2 {
        color: #2873FF;
        opacity: 1;
        border-radius: 6px;
    }
    .radio-check h2{
        font-size: 1.125rem;
        text-align: left;
        font-weight: normal;
        margin: 5px 0;
    }
    .activeClass label{
        border: 1px solid #2873FF;
        background-color: #E0F0FF;
        border-radius: 5px;
        display: block;
        height: 100%;
    }
    .footer {
        position: fixed;
        display: block;
        z-index: 999;
        bottom: 0;
        height: 80px;
        width: 100%;
        background: #ffffff;
        box-shadow: 0 -1px 8px 1px #EFF3FF;
    }
    .van-button--large {
        height: 80px;
        line-height: 78px;
        border-radius: 0;
    }
    .footer p {
        font-size: 0.75rem;
        margin: 5px 0;
        text-align: center;
    }
    .footer h1 {
        font-size: 2.25rem;
        text-align: center;
        line-height: 26px;
    }
    .footer span {
        font-size: 1.125rem;
    }

</style>
