var mongoose = require('mongoose')

var eventoSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        require: true,
        trim: true
    },
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    idProveedor:{
        type: String,
        require: true,
        trim: true
    },
    fechaInicio:{
        type: Date,
        require: true
    },
    fechaFinal:{
        type: Date,
        require: true
    },
    precio:{
        type: Number,
        require: true
    },
    Descuento:{
        type: Number
    },
    cantEntradas:{
        type: Number,
        min: 0
    },
    tipoEvento:{
        type: String,
        require: true,
        trim: true
    },
    idCategoria:{
        type: String
    }
})

module.exports = mongoose.model('Evento', eventoSchema);