import Router from 'koa-router'
import axios from './utils/axios'
// import Province from '../dbs/models/province'
// import City from '../dbs/models/city'

let router = new Router({prefix: '/geo'})

// 获取当前位置
router.get('/getPosition', async (ctx) => {
    let {status, data:{province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition`)
    if (status === 200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})

// 获取省份数据
router.get('/province', async (ctx) => {

    // 本地数据库实验
    // let province = await Province.find()
    // ctx.body = {
    //     province: province.map(item => {
    //         return {
    //             id: item.id,
    //             name: item.value[0]
    //         }
    //     })
    // }

    // 线上服务，获取完整数据
    let {status, data:{province}} = await axios.get(`http://cp-tools.cn/geo/province`)
    ctx.body = {
        province: status===200 ? province : []
    }
})

// 
router.get('/province/:id', async (ctx) => {
    
    // 本地
    // let city = await City.findOne({id: ctx.params.id})
    // ctx.body = {
    //     code: 0,
    //     city: city.value.map(item => {
    //         return {province: item.province, id: item.id, name: item.name}
    //     })
    // }

    // 线上
    let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
    ctx.body = {
        city: status===200 ? city : []
    }
})

// 
router.get('/city', async (ctx) => {
    
    // 本地
    // let city = []
    // let result = await City.find()
    // result.forEach(item => {
    //     city = city.concat(item.value)
    // })
    // ctx.body = {
    //     code: 0,
    //     city: city.map(item => {
    //         return {
    //             province: item.province,
    //             id: item.id,
    //             name: item.name === '市辖区' || item.name === '省直辖县级行政区域' ? item.province : item.name
    //         }
    //     })
    // }

    // 线上
    let {status, data:{city}} = await axios.get(`http://cp-tools.cn/geo/city`)
    ctx.body = {
        city: status===200 ? city : []
    }
})

//
router.get('/hotCity', async (ctx) => {
    
    // 本地 
    // let list = ['北京市', '上海市', '广州市']
    // let result = await City.find()
    // let nList = []
    // result.forEach(item => {
    //     nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    // })
    // ctx.body = {
    //     hots: nList
    // }

    // 线上
    let {status, data:{hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity`)
    ctx.body = {
        hots: status===200 ? hots : []
    }
})


// 获取菜单数据
router.get('/menu', async (ctx) => {
    let {status, data:{menu}} = await axios.get(`http://cp-tools.cn/geo/menu`)
    ctx.body = {
        menu: status===200 ? menu : []
    }
})

export default router;