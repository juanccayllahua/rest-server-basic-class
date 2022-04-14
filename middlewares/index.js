const validaCampos = require('../middlewares/validar-jwt');
const validaJWT = require('../middlewares/validar-roles');
const validaRoles = require('../middlewares/validarcampos');
const  validarArchivo = require('../middlewares/validar-archivo')


module.exports ={
    ...validarArchivo,
    ... validaCampos,
    ... validaJWT,
    ... validaRoles,

}