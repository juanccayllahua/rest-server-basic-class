const { response } = require("express")
const { Categoria } = require('../models')

//Obtener categorias  paginado total populate

const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));

    // const total = await Usuario.countDocuments(query)

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre').skip(Number(desde)).limit(Number(limite))
    ])

    res.json({
        total, categorias
    })
}


//Obtener categorias  populate
const obtenerCategoriaporId = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json(categoria)
}

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria  ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar data Guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria)
    // console.log()

}



//Actualizar categorias
const actualizaCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });


    res.json(categoria);

}

//borrar categorias estado:false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json(categoriaBorrada);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaporId,
    actualizaCategoria,
    borrarCategoria
}