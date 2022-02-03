const {response} =  require('express');
const Role = require('../models/role');

const create = async(req, res = response) => {

    const { name } = req.body;
    const role = new Role({name});

    await role.save();


    res.json({
        status:true,
        role
    })
}

module.exports = {
    create
}