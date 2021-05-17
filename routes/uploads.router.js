// Path: api/todo/:busqueda

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const {validarJwt} =require('../middelwares/jwt/validarJwt');
const {fileUpload,retornarImagen} = require('../controllers/uploads.controller');
const router  = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',validarJwt,fileUpload);
router.get('/:tipo/:foto',validarJwt,retornarImagen)

module.exports = router;