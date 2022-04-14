const path = require('path')
const { response } = require("express");
const { v4: uuidv4 } = require('uuid')

const subirArchivo = async (files, extencionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {


    return new Promise((resolve, reject) => {

        const { archivo } = files

        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];
        
        //validar extenciones  

        if (!extencionesPermitidas.includes(extencion)) {
            return reject(`la extencion .${extencion} no es permitida ${extencionesPermitidas} `)

        } 
        const nombreTmp = uuidv4() + '.' + extencion;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);


        archivo.mv(uploadPath, (err) => {

            if (err) {
                reject(err)
            }
            resolve(nombreTmp)


        });


    })



}

module.exports = {
    subirArchivo
}