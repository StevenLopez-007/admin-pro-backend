require('dotenv').config();

const express  = require('express');
const {dbConnection} = require('./database/config')
const cors = require('cors');

const app = express();

app.use(cors());
// Rutas

app.get('/',(req,res)=>{
    res.status(400).json({
        ok:true,
        msg:'Hola mundo'
    });
});

dbConnection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Servidor corriendo '+process.env.PORT);
    });
}).catch((e)=>{
    console.log(e)
})