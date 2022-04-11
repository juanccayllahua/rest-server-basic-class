const { Usuario,Categoria, Producto } = require('../models');
const Role = require('../models/role');
 
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeemail = await Usuario.findOne({ correo });
    console.log('joll', existeemail);
    if (existeemail) {
        throw new Error(`El email ${correo} ya existe`)
        // return res.status(400).json({
        //     msg:'Ese correo ya esta registrado'
        // });
    }
}


const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    //console.log('joll',existeemail);
    if (!existeUsuario) {
        throw new Error(`El Id ${id} NO existe`)
        // return res.status(400).json({
        //     msg:'Ese correo ya esta registrado'
        // });
    }
}
//Valida id de categoria en la BD mongo
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
     
    if (!existeCategoria) {
        throw new Error(`El Id ${id} de categoria NO existe`)
         
    }
}


const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
     
    if (!existeProducto) {
        throw new Error(`El Id ${id} de Producto NO existe`)
         
    }
}

module.exports = { 
    esRolValido, 
    emailExiste, 
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId }