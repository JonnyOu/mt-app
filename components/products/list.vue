<template>
    <div class="m-products-list">
        <dl>
            <dd v-for="item in nav" :key="item.name" 
                :class="[item.name, item.active?'s-nav-active':'']"
                @click = "navSelect">     
                {{ item.txt }}
            </dd>
        </dl>
        <ul>
            <Item v-for="(item,idx) in list" :key="idx" :meta="item" />
        </ul>
    </div>
</template>

<script>
import Item from './product'
export default {
    components: {
        Item
    },
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            nav: [
                {
                    name: 's-default',
                    txt: '默认',
                    active: true
                }, {
                    name: 's-price',
                    txt: '价格最低',
                    active: false
                }, {
                    name: 's-vlist',
                    txt: '人气最高',
                    active: false
                }, {
                    name: 's-comment',
                    txt: '评价最高',
                    active: false
                }
            ]          
        }
    },
    async asyncData({app}) { // 服务端动作，相当于在服务端发起
        let {data} = await app.$axios.get('searchList')
        return { items: data.list }
    },
    methods: {
        navSelect: function() {
            console.log('select')
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/products/index.scss"
</style>