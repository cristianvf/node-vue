const { Schema, model } = require('mongoose');

const dateSchema = new Schema({
    description:{
        type:String,
        required:[true, 'The description is required']
    },
    date:{
        type:Date,
        required:[true, 'The date is required']
    },
    price:{
        type:String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    clinic_id:{
        type: Schema.Types.ObjectId,
        ref: 'clinic'
    },
    doctor_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
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

module.exports = model('date', dateSchema)