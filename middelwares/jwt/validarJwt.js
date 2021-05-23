const { response, request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Usuario = require('../../models/usuario.model');
const validarJwt = async (req = request, res = response, next) => {
    const token = req.headers['a-token'];
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = await jwt.verify(token, process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'));
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}

const validarAdmin = (req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene los privilegios necesarios para esta operación'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador '
        })
    }
}

const validarAdmin_o_equals = (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;
    try {

        const usuarioDB = Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        }
        else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene los privilegios necesarios para esta operación'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador '
        })
    }
}

module.exports = {
    validarJwt,
    validarAdmin,
    validarAdmin_o_equals

}