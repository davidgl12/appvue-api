const mongoose = require('mongoose');

const Esquema = mongoose.Schema;
const EsquemaCalificacion = new Esquema({
  producto: String,
  calificacion: Number,
});

const Calificacion = mongoose.model('Calificacion', EsquemaCalificacion);
module.exports = Calificacion;