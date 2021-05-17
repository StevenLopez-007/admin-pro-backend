const jwt = require('jsonwebtoken');
require('dotenv').config();
const generarJwt = (uid)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),{
            algorithm:'RS256',expiresIn:'12h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        });
    })
}

module.exports ={
    generarJwt
}