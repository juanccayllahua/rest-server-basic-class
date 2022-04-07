const validaCampos = require('../middlewares/validar-jwt');
const validaJWT = require('../middlewares/validar-roles');
const validaRoles = require('../middlewares/validarcampos');


module.exports ={
    ... validaCampos,
    ... validaJWT,
    ... validaRoles
}