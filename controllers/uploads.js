
const path = require('path')
const fs = require('fs')
const { response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const usuario = require("../models/usuario");

const cargarArchivo = async (req, res = response) => {




    try {
        // const nombre = await subirArchivo(req.files, ['txt', 'md']);
        const nombre = await subirArchivo(req.files, undefined, 'imgs');


        res.json({
            nombre
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
}

const actualizarImagen = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: `Se me olvido  validar esto ${coleccion}` })
    }

    ///limpiar imagenens previas
    if (modelo.img) {
        //hay que borrar img existente 
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre

    await modelo.save();



    res.json({
        modelo
        // id, coleccion
    })

}

const mostrarImage = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: `Se me olvido  validar esto ${coleccion}` })
    }

    ///limpiar imagenens previas
    if (modelo.img) {
        //hay que borrar img existente 
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImage)) {
            //hidden rout ....
            return res.sendFile(pathImage)

        }

    }
    const pathImagePlaceHolder = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagePlaceHolder)
    // res.json({
    //     msg:`Falta place holder`
    // })

}


const actualizarImagenCloudBinary = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: `Se me olvido  validar esto ${coleccion}` })
    }

    ///limpiar imagenens previas
    if (modelo.img) {
        const  nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length-1]

        const [public_id] = nombre.split('.');

        await cloudinary.uploader.destroy(public_id);

        // console.log(public_id)
    }
    const { tempFilePath } = req.files.archivo;
    const {secure_url} =await cloudinary.uploader.upload(tempFilePath);
 
    modelo.img = secure_url

     await modelo.save();



    res.json(
        modelo 
    )

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImage,
    actualizarImagenCloudBinary
}