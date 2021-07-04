// Path: /api/login

const {Router} = require('express');
const {login,googleSignIn,refreshToken,facebookSignIn} = require('../controllers/auth.controller');
const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos');
const {validarJwt} = require('../middelwares/jwt/validarJwt');
const passport = require('passport');
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

router.get('/facebook/token',function(req,res,next){
        passport.authenticate('facebook-token', function(err, user, info) {
            if (err) {throw '' }
            req.user = user;
            next();
            // createSendToken(req.user, res);
          })(req, res, next);
},facebookSignIn)

router.get('/refreshToken',
[
    validarJwt
],refreshToken)

module.exports = router;