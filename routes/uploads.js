const { Router } = require('express');
const { check } = require('express-validator');
const { validarcampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, 
    mostrarImage, actualizarImagenCloudBinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',
    [
        validarArchivoSubir,
        check('id', 'El id debe ser un id mongo valido ').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validarcampos

    ],
    actualizarImagenCloudBinary)
    // actualizarImagen)

router.get('/:coleccion/:id',
    [
        check('id', 'El id debe ser un id mongo valido ').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validarcampos
    ], mostrarImage
)


module.exports = router