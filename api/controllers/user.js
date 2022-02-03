const { response } = require('express');
const User = require('../models/user');
const User_role = require('../models/user_role');
const bcryptjs = require('bcryptjs');

const create = (req, res = response) => {

    const { name, last_name, email, password, role } = req.body;
    const user = new User({name, last_name, email, password});
    
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    user.save();

    const user_id = user._id
    const role_id = role;

    const user_role = new User_role({user_id, role_id});

    user_role.save();

    res.json({
        status:true,
        user
    });
}

module.exports = {
    create
}