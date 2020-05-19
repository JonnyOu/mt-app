<template>
    <div>
        1
    </div>
</template>

<script>
export default {
    layout: 'blank', // 背景页面由default改为blank
    middleware: async (ctx) => {
        let {status, data} = await ctx.$axios.get('/users/exit')
        if (status === 200 && data && data.code === 0) {
            window.location.href='/'
        }
    }
}
</script>

<style lang="scss">

</style>