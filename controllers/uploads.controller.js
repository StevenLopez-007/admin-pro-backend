const path = require('path');
const fs = require('fs');

const { response } = require("express");
const {v4:uuidv4} = require('uuid');
const { actualizarImagen } = require("../helpers/actualizarImagen");

const fileUpload = (req,res=response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    if(!['usuarios','medicos','hospitales'].includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo tiene que ser usuairios/medicos/hospitales'
        });
    }

    // Validar que exista un archivo
    if(!req.files || Object.keys(req.files).length ===0){
        return res.status(400).json({
            ok:false,
            msg:'No se ha subido ningun archivo'
        })
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    

    if(!['png','jpg','jpeg','gif'].includes(extensionArchivo.toLowerCase())){
        return res.status(400).json({
            ok:false,
            msg:'El tipo de archivo es invalido'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo =  `${uuidv4()}.${extensionArchivo.toLowerCase()}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path,function(err){
        if(err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });
        }
        // Actualizar base de datos
        actualizarImagen(tipo, id,nombreArchivo);
        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
    });

}

const retornarImagen = (req,res=response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    if(!['usuarios','medicos','hospitales'].includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo tiene que ser usuairios/medicos/hospitales'
        });
    }

        const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

        if(fs.existsSync(pathImg)){
            res.sendFile(pathImg);
        }else{
            const pathImg = path.join(__dirname,`../uploads/noImg.png`);
            res.sendFile(pathImg)
        }
}

module.exports ={
    fileUpload,
    retornarImagen
}