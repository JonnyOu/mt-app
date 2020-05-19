import Router from 'koa-router'
import axios from './utils/axios'
// import Province from '../dbs/models/province'
// import Categroy from '../dbs/models/categroy'

let router = new Router({prefix: '/categroy'})

router.get('/crumbs', async (ctx) => {
    // 本地
    // let result = await Categroy.findOne({city: ctx.query.city.replace('市','') || '湛江'})
    // if (result) {
    //     ctx.body = {
    //         areas: result.areas,
    //         types: result.types
    //     }
    // } else {
    //     ctx.body = {
    //         areas: [],
    //         types: []
    //     }
    // }

    // 线上
    let {status, data:{areas, types}} = await axios.get('http://cp-tools.cn/categroy/crumbs', {
        params: {
            city: ctx.query.city.replace('市','') || '湛江'
        }
    })
    ctx.body = {
        areas: status===200?areas:[],
        types: status===200?types:[]
    }
})

export default router;