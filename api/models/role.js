const { Schema, model } = require('mongoose')

const rolSchema = new Schema({
    name:{
        type:String,
        required:[true, 'The name is required']
    },
    status:{
        type:Number,
        default:1
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = model('role', rolSchema);