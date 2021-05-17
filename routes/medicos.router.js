// Path: /apirMedicoes
const {Router} = require('express');

const {check} = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos')
const { validarJwt } = require('../middelwares/jwt/validarJwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos.controller');

const router = Router();


router.get('/',getMedicos);

router.post('/',
[   
    validarJwt,
    check('nombre','El nombre es necesario').not().isEmpty(),
    check('hospital','El id del hospital debe ser valido').isMongoId(),
    validarCampos
],crearMedico);

router.put('/:id',
[
],actualizarMedico);

router.delete('/:id',borrarMedico);

module.exports=router;