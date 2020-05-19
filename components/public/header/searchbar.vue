<template>
    <div class="search-panel">
        <el-row class="m-header-search">
            <el-col :span="3" class="left">
                <a href="/"><img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团"></a>
            </el-col>
            <el-col :span="10" class="center">
                <div class="wrapper">
                    <el-input 
                    placeholder="搜索商家或地点" 
                    v-model="search"
                    @focus="focus"
                    @blur="blur" 
                    @input="input" 
                     /> 
                     <!-- 
                            focus:当输入框聚焦时，执行focus方法，使得isFocus = true
                            focus:当输入框失焦时，执行focus方法，使得isFocus = false
                    -->
                    <el-button type="primary"><i class="el-icon-search"/></el-button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx">
                            <a :href="'/products?keyword='+item.name"> {{ item.name }} </a>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item, idx) in searchList" :key="idx" >
                            <a :href="'/products?keyword='+item.name"> {{ item.name }} </a>
                        </dd>
                    </dl>
                </div>
                <p class="suggset">
                    <a v-for="(item, idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx" :href="'/products?keyword='+item.name">
                        {{item.name}}
                    </a>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="business">美团酒店</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="appartment">名宿/公寓</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li><i class="refund"/><p class="txt">随时退</p></li>
                    <li><i class="single"/><p class="txt">不满意免单</p></li>
                    <li><i class="overdue"/><p class="txt">过期退</p></li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    data() {
        return {
            isFocus: false,
            search: '',
            hotPlace: [],
            searchList: []
        }
    },
    computed: {
        isHotPlace: function() {
            return this.isFocus&&!this.search
        },
        isSearchList: function() {
            return this.isFocus&&this.search
        }
    },
    methods: {
        focus: function() {
            this.isFocus = true
        },
        blur: function() {
            let self = this;
            setTimeout(function() {
                self.isFocus = false
            }, 200)
        },
        input: _.debounce(async function() {
            let self = this
            let city = self.$store.state.geo.position.city.replace('市', '')
            self.searchList = []
            let {status, data:{top}} = await self.$axios.get('/search/top', {
                params: {
                    input: self.search,
                    city
                }
            })
            self.searchList = top.slice(0.10)
        },300)
    }
}
</script>

<style lang="scss">
   
</style>