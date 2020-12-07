<template>
    <div class="box">
        <main class="main">
            <div style="text-align: center; margin-top: 50px">
                <img src="@/assets/img/icon_complete@2x.png" style="width:70px"/>
                <p class="success">{{text}}</p>
            </div>
        </main>
    </div>
</template>

<script>
    import util from '../../util/util';

    export default {
        name: "refundSuccess",
        data() {
            return {
                type: this.$route.query.type,
                text: '退款成功'
            }
        },
        mounted() {
            this.type = util.getUrlKey("type");
            if (this.type == 0) {
                this.text = "退款成功"
            }
            if (this.type == 1) {
                this.text = "提前结清成功"
            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="stylus">
    .box{
        padding: 15px;
    }
    .main {
        overflow: scroll
    }
</style>
