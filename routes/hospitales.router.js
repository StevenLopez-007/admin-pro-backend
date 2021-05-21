// Path: /api/hospitales
const {Router} = require('express');

const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos')
const { validarJwt } = require('../middelwares/jwt/validarJwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales.controller');

const router = Router();


router.get('/',validarJwt,getHospitales);

router.post('/',
[  
    validarJwt,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],crearHospital);

router.put('/:id',
[
    validarJwt,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],actualizarHospital);

router.delete('/:id',validarJwt,borrarHospital);

module.exports=router;