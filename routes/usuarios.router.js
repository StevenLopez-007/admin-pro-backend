// Ruta: /api/usuarios

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos')
const {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario} = require('../controllers/usuario.controller');
const { validarJwt, validarAdmin,validarAdmin_o_equals } = require('../middelwares/jwt/validarJwt');
const router = Router();

router.get('/',validarJwt,validarAdmin,getUsuarios);

router.post('/',
[   
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El E-mail es invalido').isEmail(),
    validarCampos
],crearUsuario);

router.put('/:id',
[
    validarJwt,
    validarAdmin_o_equals,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El E-mail es obligatorio').isEmail(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos
],actualizarUsuario);

router.delete('/:id',validarJwt,validarAdmin,borrarUsuario)
module.exports = router;