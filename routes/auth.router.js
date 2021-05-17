// Path: /api/login

const {Router} = require('express');
const {login,googleSignIn,refreshToken} = require('../controllers/auth.controller');
const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos');
const {validarJwt} = require('../middelwares/jwt/validarJwt')
const router  = Router();

router.post('/',
[
    check('email','El E-mail es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)
router.post('/google',
[
    check('token','El token de Google es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn)

router.post('/refreshToken',
[
    validarJwt
],refreshToken)

module.exports = router;