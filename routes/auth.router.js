// Path: /api/login

const {Router} = require('express');
const {login} = require('../controllers/auth.controller');
const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos')
const router  = Router();

router.post('/',
[
    check('email','El E-mail es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)

module.exports = router;