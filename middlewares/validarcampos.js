const { validationResult } = require('express-validator');
const validarcampos = (req,res,next)=>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json(
            errores
        )
    }
    next();

}

module.exports = {validarcampos}