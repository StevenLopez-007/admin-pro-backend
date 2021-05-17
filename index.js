require('dotenv').config();

const express  = require('express');
const {dbConnection} = require('./database/config')
const cors = require('cors');

const app = express();

// Cors
app.use(cors());

// Lectura y parseo de body
app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit:'25mb',extended:true}))


// Rutas
app.use('/api/usuarios',require('./routes/usuarios.router'));
app.use('/api/hospitales',require('./routes/hospitales.router'));
app.use('/api/medicos',require('./routes/medicos.router'));
app.use('/api/login',require('./routes/auth.router'));
app.use('/api/todo',require('./routes/busquedas.router'));
app.use('/api/uploads',require('./routes/uploads.router'));

// Coneccion de base de datos y levantamiento del servidor
dbConnection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Servidor corriendo '+process.env.PORT);

        // Directorio Publico
        // app.use(express.static('public'))
    });
}).catch((e)=>{
    console.log(e)
})