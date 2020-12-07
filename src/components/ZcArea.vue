<template>
    <van-picker
            ref="picker"
            :show-toolbar="showToolbar"
            valueKey="name"
            :title="title"
            :loading="loading"
            :columns="datas"
            :itemHeight="itemHeight"
            :swipeDuration="swipeDuration"
            :visibleItemCount="visibleItemCount"
            :cancelButtonText="cancelButtonText"
            :confirmButtonText="confirmButtonText"
            @confirm="onConfirm"
            @change="onChange"
            @cancel="onCancel"
    >
    </van-picker>
</template>

<script>
    export default {
        name: "ZcArea",
        props: {
            areaList: {
                type: Array,
                default: () => []
            },
            columnsNum: {
                type: [Number, String],
                default: 3
            },
            loading: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "地区选择"
            },
            confirmButtonText: {
                type: String,
                default: "确认"
            },
            cancelButtonText: {
                type: String,
                default: "取消"
            },
            swipeDuration: {
                type: [Number, String],
                default: 1000
            },
            columnsPlaceholder: {
                type: Array,
                default: () => []
            },
            value: {
                type: String,
                default: ""
            },
            itemHeight: {
                type: [Number, String],
                default: 44
            },
            visibleItemCount: {
                type: [Number, String],
                default: 6
            }

        },
        watch: {
            value(val) {
                this.setValues(val);
            },
            areaList(val) {
                let arr = []
                for (let i = 0; i < val.length; i++) {
                    let obj = val[i];
                    arr.push(this.fixData(obj, 1));

                }
                this.columns = arr;
                this.setValues(this.value);
            },
            columnsNum: function columnsNum() {
                this.datas = []
                for (let i = 0; i < this.columnsNum; i++) {
                    this.datas.push({values: []})
                }
                this.$nextTick(() =>
                    this.setValues()
                );
            }
        },
        created() {
            this.setValues(this.value)
            this.datas = []
            for (let i = 0; i < this.columnsNum; i++) {
                this.datas.push({values: []})
            }
        },
        mounted(){
        },
        data() {
            return {
                showToolbar: true,
                columns: [],
                datas: [{values: []}, {values: []}, {values: []}]
            }
        },
        methods: {
            fixData: function (obj, index) {
                if (index == this.columnsNum) {
                    if (obj) {
                        return {name: obj.name, code: obj.code};
                    } else {
                        return '';
                    }
                } else if (index < this.columnsNum) {
                    if (obj) {
                        let data = {name: obj.name, code: obj.code};
                        if (obj.children && obj.children.length > 0) {
                            let arr = [];
                            for (let i = 0; i < obj.children.length; i++) {
                                arr.push(this.fixData(obj.children[i], index + 1))
                            }
                            data.children = arr;
                        } else {
                            data.children = '';
                        }
                        return data;
                    }
                }
                return null;
            },
            onCancel: function () {
                this.$emit('cancel');
            },
            onChange: function onChange(picker, values, index) {
                let code = values[index].code;
                this.setValues(code);
            },
            onConfirm: function onConfirm(values, index) {
                let result = [];
                let cur = this.columns;
                for (let i = 0; i < index.length; i++) {
                    cur = cur[index[i]];
                    if (!cur && typeof cur != 'object') {
                        break;
                    }
                    result.push({"code": cur.code, "name": cur.name});
                    cur = cur.children
                }
                this.$emit('confirm', result);

            },
            setValues: function setValues(val) {
                if (!val) {
                    return;
                }
                let indexs = [];
                for (let i = 0; i < this.columnsNum; i++) {
                    indexs.push(0);
                }
                let arr = this.columns;
                let idx = 0;
                while (true) {
                    let chosen = false;
                    inner:for (let i = 0; i < arr.length; i++) {
                        let area = arr[i];
                        let orginalCode = this.getCode(area.code);
                        if (val.indexOf(orginalCode) === 0) {
                            indexs[idx] = i;
                            idx++;
                            arr = area.children;
                            chosen = true;
                            break inner;
                        }
                    }
                    if (!chosen) {
                        break;
                    }
                    if (!arr || arr.length == 0) {
                        break;
                    }
                }
                let picker = this.$refs.picker;
                if (!picker) {
                    return;
                }
                let areas = this.columns;
                for (let i = 0; i < indexs.length; i++) {
                    picker.setColumnValues(i, this.getPureList(areas));
                    areas = areas[indexs[i]].children;
                }
                picker.setIndexes(indexs);
            },
            getPureList(arr) {
                let arr1 = []
                for (let i = 0; i < arr.length; i++) {
                    arr1.push({name: arr[i].name, code: arr[i].code});
                }
                return arr1;
            },
            getCode(codestr) {
                let code = parseInt(codestr);
                if (code % 100 === 0) {
                    if (code % 10000 === 0) {
                        if (code % 100000000 === 0) {
                            return code / 100000000 + '';
                        }
                        return code / 10000 + '';
                    }
                    return code / 100 + ''
                }
                return codestr;
            },
            // @exposed-api
            reset: function reset(code) {
                this.code = code || '';
                this.setValues();
            }
        }
    }
</script>

<style scoped>

</style>
