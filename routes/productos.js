const { Router, response } = require('express');
const { check } = require('express-validator');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators')
const {
    obtenerProducto,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto } = require('../controllers/productos');
const { validarcampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProducto)

//Obtener productos por id
router.get('/:id',
    [
        check('id', 'no es un id de producto mongo').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarcampos,
    ],
    obtenerProductoPorId)


//crear productos
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de producto es obligatorio ingresar').not().isEmpty(),
        check('categoria', 'No es un id categoria de mongo valido').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarcampos
    ],
    crearProducto)

//actualiza productos
router.put('/:id',
    [
        validarJWT, 
        // check('id', 'El id no es un id mongo valido ').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarcampos
    ],
    actualizarProducto)



router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'El id no es un id mongo valido ').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarcampos,
    ],
    eliminarProducto)

module.exports = router;