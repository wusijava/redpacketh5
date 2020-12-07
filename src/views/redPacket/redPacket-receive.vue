<template>
    <div class="box">
        <img src="../../assets/img/pic_bj_r.png"/>
        <div class="title">
            <p>湖北点赞科技的红包</p>
        </div>
        <div class="page-section flip-container">
            <div class="page-section-demo flipper">
                <div class="redPacket-btn b1" ref="redPacket" v-bind:class="[rotate?'b1':'b2']" @click="rotateFn">
                    <img src="../../assets/img/pic_no.png"/>
                </div>
                <div class="redPacket-btn b2" ref="redPacketBack" v-bind:class="[rotate?'b2':'b1']" @click="rotateFn">
                    <img src="../../assets/img/pic_no.png"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getRedPacket} from '../../api/commission';

    export default {
        name: "redPacketReceive",
        data() {
            return {
                rotate: true,
                aliPayUid: this.$route.query.aliPayUid,
                rebateNo: this.$route.query.rebateNo,
                amount: this.$route.query.amount,
            }
        },
        mounted() {
        },
        methods: {
            rotateFn() {
                if(this.rotate){
                    this.$refs.redPacket.style.transform = "rotateY(180deg)";
                    this.$refs.redPacketBack.style.transform = "rotateY(0deg)";

                    let params = {};
                    params.aliPayUid = this.aliPayUid;
                    params.rebateNo = this.rebateNo
                    getRedPacket(params).then((result)=> {
                        if(result.data.code == '20000') {
                            this.$router.push({
                                name: 'redPacketReceiveSuccess',
                                query:{
                                    aliPayUid: this.aliPayUid,
                                    rebateNo: this.rebateNo,
                                    amount: this.amount
                                }})
                        }else {
                            this.$toast({
                                message: result.data.msg,
                                icon: 'warning-o'
                            });
                            return;
                        }
                    })
                    // setTimeout(()=> {
                    // },1200)
                }
                else{
                    this.$refs.redPacketBack.style.transform = "rotateY(180deg)";
                    this.$refs.redPacket.style.transform = "rotateY(0deg)";
                }
                this.rotate = !this.rotate;
            },
        }
    }
</script>

<style scoped>
    .box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #EA484D;
    }
    .box img {
        width: 100%;
    }
    .title {
        position: relative;
        top: -190px;
    }
    .title p {
        font-size: 17px;
        color: #FFDF9D;
        text-align: center;
    }
    .page-section {
        margin: 0 auto;
        position: relative;
        top: -130px;
    }
    .page-section-demo {
        display: flex;
        justify-content: space-around;
    }
    .flip-container {
        perspective:100%;
    }
    .flip-container:active .flipper {
        transform:rotateY(180deg);
    }
    .redPacket-btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 124px;
        height: 124px;
        transition: all 1s;
        backface-visibility: hidden;
        border-radius: 10px;
        cursor: pointer;
    }
    .redPacket-btn image{
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }
    .b1{
        background-color: transparent;
    }
    .b2 {
        background-color: transparent;
        transform: rotateY(-180deg);
    }
    @-webkit-keyframes animations{
        0%{-webkit-transform:translate(0);opacity:0;}
        50%{-webkit-transform:translate(30px);opacity:1;}
        70%{-webkit-transform:translate(35px);opacity:1;}
        100%{-webkit-transform:translate(60px);opacity:0;}
    }
    @-moz-keyframes animations{
        0%{-moz-transform:translate(0);opacity:0;}
        50%{-moz-transform:translate(30px);opacity:1;}
        70%{-moz-transform:translate(35px);opacity:1;}
        100%{-moz-transform:translate(60px);opacity:0;}
    }
    @-o-keyframes animations{
        0%{-o-transform:translate(0);opacity:0;}
        50%{-o-transform:translate(30px);opacity:1;}
        70%{-o-transform:translate(35px);opacity:1;}
        100%{-o-transform:translate(60px);opacity:0;}
    }
    @-ms-keyframes animations{
        0%{-ms-transform:translate(0);opacity:0;}
        50%{-ms-transform:translate(30px);opacity:1;}
        70%{-ms-transform:translate(35px);opacity:1;}
        100%{-ms-transform:translate(60px);opacity:0;}
    }
    @keyframes animations{
        0%{transform:translate(0);opacity:0;}
        50%{transform:translate(30px);opacity:1;}
        70%{transform:translate(35px);opacity:1;}
        100%{transform:translate(60px);opacity:0;}
    }

    .flip-container:link .flipper {
        transform:rotateY(180deg);
    }

    .flip-container,.front,.back {
        width:124px;
        height:124px;
    }

    .front,.back {
        position: absolute;
    }

    .back {
        transform:rotateY(180deg);
    }

    /*.demo{*/
    /*    text-align: center;*/
    /*    margin-top: 100px;*/
    /*}*/
    /*@-webkit-keyframes rotation*/
    /*{*/
    /*    from {-webkit-transform: rotateY(0deg);}*/
    /*    to {-webkit-transform: rotateY(360deg);}*/
    /*}*/
    /*.an{*/
    /*    -webkit-transform: rotate(360deg);*/
    /*    animation: rotation 3s linear infinite;*/
    /*    -moz-animation: rotation 3s linear infinite;*/
    /*    -webkit-animation: rotation 3s linear infinite;*/
    /*    -o-animation: rotation 3s linear infinite;*/
    /*}*/


</style>
