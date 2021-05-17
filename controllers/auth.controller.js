const { response } = require("express");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/jwt.helper");
const login = async(req,res=response)=>{
    const {email,password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        // Verificar email
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'E-mail no válido'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no válida'
            })
        }

        // Generar token
        const token = await generarJwt(usuarioDB.id);

        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

}

module.exports ={
    login
}