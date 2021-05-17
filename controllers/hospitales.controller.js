const { response } = require("express");
const Hospital = require('../models/hospital.model');
const getHospitales = async (req,res=response)=>{

    const hospitales = await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async(req,res=response)=>{

    const hospital = new Hospital({
        usuario:req.uid,
        ...req.body
    });

    try {

      const hospitalDB = await hospital.save();

      res.json({
          ok:true,
          hospitalDB
      })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarHospital = async (req,res=response)=>{

    try {

        const id = req.params.id;
        const uid = req.uid;

        const hospital = Hospital.findById(id);

        if(!hospital){
            return res.status(400).json({
                ok:false,
                msg:'El hospital no existe'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true});


        res.json({
            ok:true,
            msg:'Hospital actualizado',
            hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })   
    }
}

const borrarHospital = async(req,res=response)=>{

    try {

        const id = req.params.id;

        const hospital = Hospital.findById(id);

        if(!hospital){
            return res.status(400).json({
                ok:false,
                msg:'El hospital no existe'
            });
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'Hospital eliminado',
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        }) 
    }
    
}


module.exports ={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}