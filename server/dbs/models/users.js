import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type:String,
        unique:true,
        require:true
    },
    password: {
        type:String,
        unique:true,
        require:true
    },
    email: {
        type:String,
        unique:true,
    }
})

export default mongoose.model('User', UserSchema)