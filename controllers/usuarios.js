const { response, request } = require('express')

const usuariosGet = (req, res = response) => {
    const { q, apikey, nombre = 'no name', page=1, limit=10 } = req.query;

    res.json({
        msg: 'GET api / CONTROL',
        q, nombre,page,limit
    })

}
const usuariosPut = (req, res) => {
    const { id } = req.params
    res.json({
        msg: 'Put api / Control',
        id
    })
}
const usuariosPost = (req, res) => {
    const { nombre, edad, ubicacion } = req.body;

    res.json({
        msg: 'Post Api / Control',
        nombre, edad, ubicacion
    })

}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete Api / Control',

    })

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