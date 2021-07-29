var mongoose = require('mongoose')

var categoriaSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        require: true,
        trim: true
    },
    nombre:{
        type: String,
        require: true,
        trim: true
    }
})

module.exports = mongoose.model('Categoria', categoriaSchema);