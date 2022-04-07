const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

//const app = express()


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto',this.port)
        })
    }


}
module.exports = Server;