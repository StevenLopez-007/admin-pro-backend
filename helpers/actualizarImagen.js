const fs = require('fs');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos': {
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }

            const pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        }
        case 'hospital': {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            const pathViejo = `./uploads/medicos/${hospital.img}`;
            borrarImagen(pathViejo)
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        }
        case 'usuarios': {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            const pathViejo = `./uploads/medicos/${usuario.img}`;
            borrarImagen(pathViejo)
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        }
    }
}

module.exports = {
    actualizarImagen
}