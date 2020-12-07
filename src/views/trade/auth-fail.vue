<template>
    <div class="box">
        <div class="content">
            <img src="@/assets/img/icon_fail.png">
            <h4>收款失败</h4>
            <p>{{desc}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "authFail",
        data() {
            return {
                desc:null,
            }
        },
        mounted() {
            this.desc = this.$route.query.desc;
        }
    }
</script>
<style scoped>
    .box{
        padding: 15px;
    }
    .content{
        text-align: center;
        width: 100%;
        margin-top: 70px;
    }
    .content img{
        width: 70px;
        height: 70px;
        margin: 0 auto;
    }
    .content span{
        font-family: PingFang-SC-Regular;
        font-size: 15px;
        color: #081828;
        line-height: 24px;
    }
    .content h4{
        font-size: 18px;
    }
    .content p{
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        line-height: 24px;
        padding: 0 30px;
    }

</style>
