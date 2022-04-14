const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

//const app = express()


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads: '/api/uploads'
        
        }
        

        //conectar DB
        this.conectarBD()
        //midelwer
        this.middleware();
        this.routes();
    }
    async conectarBD (){
        await dbConnection()
    }
    middleware(){
        //cors 
        this.app.use(cors())
        //parseo y lectura de body
        this.app.use(express.json())
        //directorio publico
        this.app.use(express.static('public'))

        //carga de archivos 

        this.app.use(fileUpload({
            useTempFiles:true,  
            tempFileDir:'/tmp/',
            createParentPath:true
        }))

    }

    routes(){
        this.app.use(this.paths.auth,       require('../routes/auth'))
        this.app.use(this.paths.buscar,     require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos,  require('../routes/productos'))
        this.app.use(this.paths.usuarios,   require('../routes/usuarios'))
        this.app.use(this.paths.uploads,   require('../routes/uploads'))
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto',this.port)
        })
    }


}
module.exports = Server;