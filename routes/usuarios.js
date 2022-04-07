const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');
const  {
    validarJWT,//,esAdminRole,
    validarcampos,tieneRole
} = require('../middlewares')

const  router = Router();



// 

router.put('/:id', 
[check('id','no es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorId)],
check('rol').custom(esRolValido),
validarcampos,
usuariosPut)
    
 
router.post('/',  [
    check('nombre','El nombre es obligatorios ').not().isEmpty(),
    check('password','El password es obligatorios, mayor a 6 letras').isLength({min:6}),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    // check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    validarcampos
]
,usuariosPost)

router.get('/', usuariosGet)

router.delete('/:id',
[validarJWT
//,esAdminRole,
,tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
check('id','no es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorId)], 
validarcampos,
usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;