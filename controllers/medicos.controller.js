const { response } = require("express");
const Medico = require('../models/medico.model');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img')
    res.json({
        ok: true,
        medicos
    })
}

const getMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id).populate('usuario', 'nombre img').populate('hospital', 'nombre img');

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El medico no existe'
            });
        }

        return res.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const crearMedico = async (req, res = response) => {
    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    });
    try {
        const medicoBD = await medico.save();

        res.json({
            ok: true,
            medicoBD
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = async (req, res = response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;

        const medico = Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El medico no existe'
            });
        }

        const cambiosmedico = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Medico.findByIdAndUpdate(id, cambiosmedico, { new: true });


        res.json({
            ok: true, 
            hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    try {
        const id = req.params.id;

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El medico no existe'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico borrado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedico
}