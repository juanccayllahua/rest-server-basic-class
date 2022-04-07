const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validarcampos');

const  router = Router();

router.post('/login',[check('correo','El correo es obligatorio').isEmail(),
    check('password','La constrana es obligatorio').not().isEmpty(),
    validarcampos
],login )


module.exports = router