// Path: api/todo/:busqueda

const {Router} = require('express');
const {getTodo, getDocumentosColeccion} = require('../controllers/busquedas.controller');
const {validarJwt} =require('../middelwares/jwt/validarJwt')
const router  = Router();

router.get('/:busqueda',validarJwt,getTodo)
router.get('/coleccion/:tabla/:busqueda',validarJwt,getDocumentosColeccion)

module.exports = router;