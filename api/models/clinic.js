const { Schema, model } = require('mongoose');

const clinicSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    }, 
    direction: String,
    schedule: Date,
    days: String,
    status: Number,
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: { type:Date, default: Date.now},
    updated_at: { type:Date, default: Date.now}
});


module.exports = model('clinic', clinicSchema);
