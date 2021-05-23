// getTodo

const { response } = require("express");
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getTodo = async (req, res = response) => {
    const buscar = req.params.busqueda;

    const regex = new RegExp(buscar, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }).populate('usuario', 'nombre email img'),
        Hospital.find({ nombre: regex }).populate('usuario', 'nombre email img')
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const buscar = req.params.busqueda;
    const regex = new RegExp(buscar, 'i');
    let data = [];

    switch(tabla){
        case 'medicos':{
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre email img');
            break;
        }
        case 'hospitales':{
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre email img');
            break;
        }
        case 'usuarios':{
            data = await Usuario.find({ nombre: regex });
            break;
        }
        default:{
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser usuarios/medicos/hospitales'
            });
        }
    }

    res.json({
        ok:true,
        resultados:data
    })
}


module.exports = {
    getTodo,
    getDocumentosColeccion
}