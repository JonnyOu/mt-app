import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
    name: {
        type:String
    },
    province: {
        type:String
    },
    city: {
        type:String
    },
    county: { // 县
        type:String
    },
    areaCode: {
        type:String
    },
    tel: {
        type:String
    },
    area: {
        type:String
    },
    addr:{
        type:String
    },
    type: { // 类型
        type:String
    },
    module: { // 子分类
        type:String
    },
    longitude: {
        type:Number
    },
    latitude: {
        type:Number
    }
})

export default mongoose.model('Poi', Poi)