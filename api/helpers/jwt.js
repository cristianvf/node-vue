const jwt = require('jsonwebtoken');

const generateJWT = (user = {}) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { 
            "id":user._id,
            "email":user.email,
            "name":user.name, 
            "last_name":user.last_name,
        }; 
    
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err , token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    } )
    
}

module.exports = {
    generateJWT
}