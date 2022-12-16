const { Schema, model } = require('mongoose');

const ListaPendientesSchema = new Schema({
    description : {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const ListaPendientes = model('listaPendientes', ListaPendientesSchema);

module.exports = ListaPendientes;