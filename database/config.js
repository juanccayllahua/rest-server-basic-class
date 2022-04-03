const mongoose = require('mongoose')

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
            //useCreateIndex:true,
            //useFindAndModify:false
        })
        console.log('base de datos en linea');

    }catch(error){
        console.log(error)
        throw  new Error('Error al abrir la Base de datos')
    }
    
}

module.exports = {
    dbConnection
}