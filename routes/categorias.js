const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearCategoria,
    obtenerCategorias,
    obtenerCategoriaporId,
    actualizaCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarcampos, validarJWT, esAdminRole } = require('../middlewares')



const router = Router();

/*
    GET {{url}}/api/categorias
*/
//Obtener todos los productos / Public
router.get('/', obtenerCategorias)

//Obtener productos por ID / Public 
router.get('/:id',
    [
        check('id', 'No es un id de mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarcampos,
    ],
    obtenerCategoriaporId)

//crear productos por ID / private token 
router.post('/',
    [
        validarJWT,
        check('nombre', 'Nombre de categoria obligatorio').not().isEmpty(),
        validarcampos
    ],
    crearCategoria
)

//actualizar  productos por ID / private token 
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre de categoria es obligatorio').not().isEmpty(),
        check('id', 'No es un ID de mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarcampos

    ], actualizaCategoria)

//borrar  productos por ID / ADMIN private token 
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID de mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarcampos
    ],
    borrarCategoria)


module.exports = router