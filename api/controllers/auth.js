const { response } = require('express'); 
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({email}).exec();

        if ( !user ) {
            return res.json({
                status:0,
                msg:'The data is incorrect.'
            });
        }

        const validPass = bcryptjs.compareSync(password, user.password);
        if ( !validPass ) {
            return res.json({
                status:0,
                msg:'The data is incorrect.'
            });
        }

        const token = await generateJWT(user);

        res.json({
            status:1,
            token:token,
            name:user.name,
            last_name: user.last_name,
            email: user.email
        });

    } catch (error) {
        res.status(500).json({
            msg:'Something was wrong'
        })

    }
}

module.exports = {
    login
}

