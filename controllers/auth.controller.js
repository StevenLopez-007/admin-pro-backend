const { response } = require("express");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/jwt.helper");
const { googleverify } = require("../helpers/googleVerify");
const { getMenuFrontEnd } = require("../helpers/menuFrontEnd");

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
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

}

const googleSignIn = async(req,res=response)=>{
    try {
        const tokenGoogle = req.body.token;

       const {name,email,picture} = await googleverify(tokenGoogle);

       const usuarioDB = await Usuario.findOne({email});

       let usuario;

       if(!usuarioDB){
        //    Si no existe el usuario
           usuario  = new Usuario({
               nombre:name,
               email,
               password:'@@@',
               img:picture,
               google:true
           })
       }else{
        //    Existe Usuairo
            usuario = usuarioDB;
            usuario.google =true;
       }
    //    Guardar usuairo

    await  usuario.save();
    // Generar token
    const token = await generarJwt(usuario.id);
        res.json({
            ok:true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok:true,
            msg:'Token no es correcto'
        })
    }
} 

const refreshToken = async(req,res=response)=>{

    const uid = req.uid;

    const token = await generarJwt(uid);

    const usuario  = await Usuario.findById(uid);
    if(!usuario){
        return res.status(400).json({
            ok:false,
            msg:'El token no pertenece a ningun usuario'
        });
    }

    res.json({
        ok:true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    })
}

module.exports ={
    login,
    googleSignIn ,
    refreshToken  
}