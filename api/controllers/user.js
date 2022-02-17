const { response } = require('express');
const User = require('../models/user');
const User_role = require('../models/user_role');
const bcryptjs = require('bcryptjs');

const create = (req, res = response) => {

    const { name, last_name, email } = req.body;


    var role = '620709a464817cd487a2b454';
    var password = 'abc123';

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

const getAll = async(req, res = response) =>{

    const users = await User.find().exec();

    res.json({
        status:true,
        users:users
    });

}

const get = async(req, res = response) => {

    const { id } = req.query;

    const user = await User.findById(id).exec();

    res.json({
        status:true,
        user
    });
}

module.exports = {
    create,
    getAll,
    get
}