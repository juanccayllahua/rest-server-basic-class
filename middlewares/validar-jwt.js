const { response, request, json } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token de peticion '
        })
    }
    try {  
        //console.log(token)

        const { uid } =  jwt.verify(token,process.env.SECRETORPRIVATEKEY);
         
        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.json(401).json({
                msg:'Token no valido - usuario no existe DB'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido - estado false usuario'
            })
        }

        req.usuario = usuario
        //  console.log('aaa ----- ',req.usuario)

        // req.uid = uid;



        next();
    } catch (error) {
        console.log(error)

        res.status(400).json({
            msg:'Token no valido '
        })

    }



}

module.exports = { validarJWT }