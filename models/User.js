var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    apellido:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true,
        minLength: 4
    },
    token:{
        type: String
    },
    tipoUser:{
        type: String
    }
})

userSchema.pre('save', async function (next) {
    // Hash de la contraseña antes de ser guardado
    const user = this
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
    }
    next()
 })
 
 userSchema.statics.findByCredentials = function(email, passw) {
     // Busca usuario por email y contraseña
    console.log('llega a1')
    this.findOne({email}, function(err, datos){
        if(!err) {
            return {err : 'correo no registrado'}
        }
        var isPasswordMatch = bcrypt.compare( passw, datos.password, function(erro, result){
            if(!erro){
                return {err: 'contraseña incorrecta'}
            }

            return datos
        })
    })
 }
 
 userSchema.static('verifyCredentials', async function(token){
     try{
         var decoded = jwt.verify( token, process.env.JWT_KEY)
         if (!decoded){
             return false
         }
         return true
     } catch(err){
         //console.log(err)
         return false
     }
 })
 
 userSchema.methods.generateAuthToken = function() {
     // Genera token para cada usuario
     return jwt.sign({_id: this._id.toString()}, process.env.JWT_KEY)
 }
 
 module.exports = mongoose.model('User', userSchema);