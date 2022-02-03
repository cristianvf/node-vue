const {Schema, model} = require('mongoose');

const clinicAssistantSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    clinic_id:{
        type: Schema.Types.ObjectId,
        ref:'clinic'
    },
    start_at:{
        type:Date
    }, 
    end_at:{
        type:Date
    },
    created_at:{
        type:Date,
        default: Date.now
    },
    updated_at:{
        type:Date,
        defult:Date.now
    }

});

module.exports = model('clinic_assistant', clinicAssistantSchema);