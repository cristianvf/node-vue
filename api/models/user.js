const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name:{
        type:String,
        required: [true, 'The name is required']
    },
    last_name:{
        type:String,
        required:[true, 'The last name is required']
    },
    password:{
        type:String,
        required:[true, 'The password is required']
    },
    email:{
        type:String,
        required:[true,'The email is required'],
        unique:true
    },
    image:{
        type:String
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


module.exports = model('user', userSchema)