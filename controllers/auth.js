const { response } = require("express")
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {

        //verificar email exist

        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'usuario/password incorrectos - correo'
            })
        }

        //verificar user active 
        if(!usuario.estado){
            return res.status(400).json({
                msg:'usuario/password incorrectos - estado; false'
            })
        }
        //verificar contrase;a

        const validPassword = await bcryptjs.compareSync(password,usuario.password)

        if(!validPassword){
            return res.status(400).json({
                msg:'usuario/password incorrectos - password'
            })
        }

        //generar json webtoken

        const token = await generarJWT(usuario.id)



        res.json({
            msg: 'login ok', usuario, token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    } 
}

module.exports = {
    login
}