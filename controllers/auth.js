const { response, json } = require("express")
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {

        //verificar email exist

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'usuario/password incorrectos - correo'
            })
        }

        //verificar user active 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'usuario/password incorrectos - estado; false'
            })
        }
        //verificar contrase;a

        const validPassword = await bcryptjs.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'usuario/password incorrectos - password'
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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        //referencia correo existe?
        let usuario = await Usuario.findOne({correo});
        


        if(!usuario){
            // try{
            // console.log('registraaa');
            //crear user
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true ,
                rol:'USER_ROLE'

            };
            usuario = new Usuario(data);

            await usuario.save();
        // } catch(errr){
        //         console.log('error',errr)
        //     }
        }

        // console.log('usuario creando .... ',usuario);
        //si el usuario en DB
        // console.log('estaa ::: ',usuario.estado)
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        // 
        const token = await generarJWT(usuario.id);
        // console.log('este es el tooo ke ns ss ',token);

        res.json({
            usuario,
            token
        }
        )
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })

    }



}

module.exports = {
    login, googleSignIn
}