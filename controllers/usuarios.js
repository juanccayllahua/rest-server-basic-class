const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');



const usuariosGet = async (req, res = response) => {



    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));

    // const total = await Usuario.countDocuments(query)

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ])

    res.json({
        total, usuarios
    })

}
const usuariosPut = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, correo, ...datos } = req.body;



    if (password) {
        const salt = bcryptjs.genSaltSync();

        datos.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, datos);

    res.json({
        usuario
    })
}
const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar correo


    // encriptar contrase;  

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save()

    res.json({
        // msg: 'Post Api / Control',
        usuario
    })

}
const usuariosDelete = async (req, res) => {
    const { id } = req.params;


    // const uid = req.uid;
    //  const usuarioautenticado = req.usuario;
 

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })



    res.json({ usuario })

}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch Api / Control'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete, usuariosPatch
}