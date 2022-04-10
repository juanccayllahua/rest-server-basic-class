const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validarcampos');

const router = Router();

router.post('/login', [check('correo', 'El correo es obligatorio').isEmail(),
check('password', 'La constrana es obligatorio').not().isEmpty(),
    validarcampos
], login)
router.post('/google', [check('id_token', 'El id token es necesario').not().isEmpty(),
    validarcampos
], googleSignIn)




module.exports = router