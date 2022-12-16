const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Esquema = mongoose.Schema;
const EsquemaUsuario = new Esquema({
    email: String,
    contrasenia: String,
});

const Usuario = mongoose.model('Usuario', EsquemaUsuario);
module.exports = Usuario;

module.exports.crearUsuario = (nuevoUsuario, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(nuevoUsuario.contrasenia, salt, (error, hash) => {
            // Almacenar la contraseña encriptada
            const recursoNuevoUsuario = nuevoUsuario;
            recursoNuevoUsuario.contrasenia = hash;
            recursoNuevoUsuario.save(callback);
        }); 
    });
};

module.exports.obtenerUsuarioporEmail = (email, callback) => {
    const consulta = { email };
    Usuario.findOne(consulta, callback);
};

module.exports.compararContrasenia = (contraseniaCandidato, hash, callback) => {
    bcryptjs.compare(contraseniaCandidato, hash, (err, coinciden) => {
        console.log('ERROR DE compararContrasenia: ', {err})
        if (err) throw err;
        else callback(null, coinciden);
    });
};