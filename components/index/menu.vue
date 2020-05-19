<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd 
            v-for="(item, idx) in $store.state.home.menu" 
            :key="idx"
            @mouseenter="enter">
                <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
            </dd>
        </dl>
        <div class="detail" 
        v-if="kind"
        @mouseenter="sover"
        @mouseleave="sout">
            <template 
            v-for="(item, idx) in curdetail.child">
            <h4 :key="idx">{{ item.title }}</h4>
            <span v-for="v in item.child" :key="v">
                {{ v }}
            </span>
            </template>    
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            kind: '',
            menu: [{
                type: 'food',
                name: '美食',
                child: [{
                    title: '美食',
                    child: ['代金券','甜点饮品','自助餐','汉堡']
                }]
            },{
                type: 'takeout',
                name: '外卖',
                child: [{
                    title: '外卖',
                    child: ['美团外卖']
                }]
            },{
                type: 'hotel',
                name: '酒店',
                child: [{
                    title: '酒店星级',
                    child: ['经济型','五星级','青年旅社']
                }]
            }]
        }
    },
    computed: {
        curdetail: function() {
            return this.$store.state.home.menu.filter((item) => item.type === this.kind)[0] // ?? 
        }
    },
    methods: {
        mouseleave: function() {
            let self = this;
            self._timer = setTimeout(function() {
                self.kind = ''
            }, 150)
        },
        enter: function(e) {
            this.kind = e.target.querySelector('i').className // 获取i上的kind值
            console.log(this.kind)
        },
        sover: function() {
            clearTimeout(this._timer) // 当鼠标在详情页面时，取消this._timer对应的方法，因为若鼠标移开菜单页面150ms后，详情页就会消失
        },
        sout: function() {
            this.kind = '' 
        }
    }
}
</script>

<style lang="css">

</style>