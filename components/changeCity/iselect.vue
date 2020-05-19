<template>
    <div class="m-iselect">
        <el-row>
            <el-col :span="16">
                <span class="name">按省份选择:</span>
                <el-select v-model="pvalue" placeholder="省份">
                    <el-option
                    v-for="item in province"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
                    <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>   
            </el-col>
            <el-col :span="8">
                <span class="name">直接搜索:</span>
                <el-autocomplete
                    v-model="input"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入城市中文或拼音"
                    @select="handleSelect"
                ></el-autocomplete>  
            </el-col>
        </el-row>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    data() {
        return {
            province: [],
            pvalue: '',
            city: [],
            cvalue: '',
            input: '',
            cities: []

        }
    },
    watch: { // 监听，当元素（如pvalue）发生变化时，执行函数
        pvalue: async function(newPvalue) {
            let self = this
            let {status, data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
            if (status === 200) {
                self.city = city.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                self.cvalue = ''
            }
        }
    },
    mounted: async function() {
        let self = this
        let {status, data:{province}} = await self.$axios.get(`/geo/province`)
        if (status === 200) {
            self.province = province.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
        }
    },
    methods: {
        // 输入内容时该方法响应
        querySearchAsync: _.debounce(async function(query, cb) {
            let self = this
            if (self.cities.length) {
                cb(self.cities.filter(item => item.value.indexOf(query) > -1))
            } else {
                let {status, data:{city}} = await self.$axios.get('/geo/city')
                if (status === 200) {
                    self.cities = city.map(item => {return {
                        value: item.name
                    }})
                    cb(self.cities.filter(item => item.value.indexOf(query) > -1))
                } else {
                    cb([])
                }
            }
        }, 200),
        // 点击提示内容时该方法响应
        handleSelect: async function(item) { 
            let self = this
            // console.log(item.value)
            // location.href = '/'

            // 下面是跳转后更新首页的信息，待定
            // 主要功能:定位城市更改为手选城市，同时依据选中的城市更新首页信息
            // bug: 1.报错TypeError: Cannot read property 'geo' of undefined，定位到$axios.state.geo....，可能原因是版本问题，大概找到不到这个路径的意思
            //      更新(解决):错了，应该是this.$store.geo...
            //      2.跳回页面后再次刷新首页，又会重新定位到所在城市，如何在不退出登录都前都保存首选城市的定位？
            self.$store.commit('geo/setPosition', {city:item.value})
           
            const {status, data:{result}} = await self.$axios.get('/search/hotPlace', {
                params:{
                    city: self.$store.state.geo.position.city.replace('市','')
            }})
            self.$store.commit('home/setHotPlace', status === 200 ? result : []) 
            self.$router.push({path:'/'})

        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/changecity/iselect.scss";
</style>
