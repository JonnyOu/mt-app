<template>
    <div class="m-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geo.position.city.replace('市','') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $store.state.geo.position.city.replace('市','') }}{{keyword}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: {
        keyword: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">

</style>