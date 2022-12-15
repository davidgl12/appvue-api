const { application } = require('express');
const Calificacion = require('../models/Calificacion');

module.exports.controller = (app) => {
  app.post('/productos/calificar/:producto', (req, res) => {
    const calif = new Calificacion({
      producto: req.params.producto,
      calificacion: req.body.calificacion,
    });
  
    calif.save(function (error, calificacion) {
      if (error) { console.log(error); }
      else {
        res.send({
          producto: calif.producto,
          calificacion: calif.calificacion,
        });
      }
    });
  });
}