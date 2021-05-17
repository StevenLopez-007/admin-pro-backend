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


router.get('/',getHospitales);

router.post('/',
[  
    validarJwt,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],crearHospital);

router.put('/:id',
[
],actualizarHospital);

router.delete('/:id',borrarHospital);

module.exports=router;