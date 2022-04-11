const { response } = require("express");
const { Producto } = require("../models");


const obtenerProducto = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    const [total, procuctos] = await Promise.all(
        [
            Producto.countDocuments(query),
            Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]
    )

    res.json({
        total,
        procuctos
    })


}

const obtenerProductoPorId = async (req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombrre')

    res.json(producto);

}

const crearProducto = async (req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    // const nombre = body.nombre.toUpperCase()
    const queryCrea = {
        nombre: body.nombre 
    }
    //const categoria = req.body.categoria;

    const productoBD = await Producto.findOne(queryCrea);

    if (productoBD) {
        res.status(400).json({
            msg: ` El producto ${productoBD.nombre} ya existe`
        })
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        // categoria,
        usuario: req.usuario._id
    }

    const producto = await Producto(data)
    await producto.save();

    res.status(201).json(producto)


}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    // data.categoria = data.categoria;
    // data.precio = data.precio;



    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json(producto);
}

const eliminarProducto = async (req, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json(productoBorrado)
}

module.exports = {
    obtenerProducto,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto

}