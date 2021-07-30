var express = require('express');
var router = express.Router();
let user = require('../models/User');
let correo = require('../models/Mail');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createuser', async function(req, res, next){
  if (!req.body){
    return res.status(401).json({message: 'No envio parametros de autenticacion.'});
  }
  try{
    var newUser = new user(req.body)
    newUser.token = newUser.generateAuthToken()
    newUser.tipoUser = 'cliente'
    newUser.confirmado = false 
    await newUser.save()

    correo.enviaCorreo(newUser, 'Bienvenida', (err) =>{
      if(!err){
        res.status(400).json({error: err})
      }
    })

    return res.status(200).json({
      newUser,
      error: '' 
    })
  } catch(error) {
    return res.status(400).json({error})
  }
});

router.get('/confirm/:token', async function(req, res, next){
  try{
    var usuario = await user.findByIdu(req.params.token)
    if(usuario.confirmado === true){
      return res.status(400).json({error: 'Usuario ya confirmado.'})
    }

    usuario.confirmado = true
    await usuario.save()

    correo.enviaCorreo(usuario, 'Confirmacion', (err) =>{
      if(!err){
        res.status(400).json({error: err})
      }
    })

    return res.status(200).json({error:''})
  } catch(error){
    return res.status(400).json({error})
  }
});

router.post('/confirm', async function(req, res, next){
  try{
    var usuario = await user.findByIdu(req.body.token)
    if(usuario.confirmado === true){
      return res.status(400).json({error: 'Usuario ya confirmado.'})
    }

    usuario.confirmado = true
    await usuario.save()

    correo.enviaCorreo(usuario, 'Confirmacion', (err) =>{
      if(!err){
        res.status(400).json({error: err})
      }
    })

    return res.status(200).json({error:''})
  } catch(error){
    return res.status(400).json({error})
  }
});

router.post('/deleteUser', async function(req, res, next){
  try{
    var infodelete = await user.deleteOne({ _id: req.body.token})
    
    return res.status(200).json({infodelete, 
      error:''})
  } catch(error){
    return res.status(400).json({error})
  }
});

module.exports = router;
