const express = require('express')
const cors = require('cors')

//const app = express()


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        //midelwer
        this.middleware();
        this.routes();
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
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto',this.port)
        })
    }


}
module.exports = Server;