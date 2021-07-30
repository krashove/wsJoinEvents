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
    },
    estado:{
        type: String,
        trim: true,
        lowercase: true,
        default: 'creado'
    }
})

/******* STATICS *******/
eventoSchema.statics.findByIdu = async function(id){
    return await this.findOne( { _id: id }).exec()
}

eventoSchema.statics.findDisponibles = async function(){
    return await this.find( { estado: 'publicado' }).exec()
}

eventoSchema.statics.findProveedor = async function(idProv){
    return await this.find( { idProveedor: idProv }).exec()
}

module.exports = mongoose.model('Evento', eventoSchema);