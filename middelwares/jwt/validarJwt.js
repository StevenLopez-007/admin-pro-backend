const { response, request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validarJwt = async (req=request,res=response,next)=>{
    const token = req.headers['a-token'];
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    try {
      const{uid} = await jwt.verify(token,process.env.JWT_PUBLIC_KEY.replace(/\\n/g,'\n'));
      req.uid = uid;
      next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }
}

module.exports ={
    validarJwt
}