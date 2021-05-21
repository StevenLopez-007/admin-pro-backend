// Path: /apirMedicoes
const {Router} = require('express');

const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos')
const { validarJwt } = require('../middelwares/jwt/validarJwt');

const {
    getMedicos,
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos.controller');

const router = Router();


router.get('/',validarJwt,getMedicos);
router.get('/:id',validarJwt,getMedico);

router.post('/',
[   
    validarJwt,
    check('nombre','El nombre es necesario').not().isEmpty(),
    check('hospital','El id del hospital debe ser valido').isMongoId(),
    validarCampos
],crearMedico);

router.put('/:id',
[
    validarJwt,
    check('hospital','El id del hospital no es válido').isMongoId(),
    validarCampos
],actualizarMedico);

router.delete('/:id',validarJwt,borrarMedico);

module.exports=router;