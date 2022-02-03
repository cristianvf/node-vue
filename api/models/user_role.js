const { Schema, model } = require('mongoose');

const userRoleSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    role_id:{
        type: Schema.Types.ObjectId,
        ref:'role'
    }
});

module.exports = model('user_role', userRoleSchema)
