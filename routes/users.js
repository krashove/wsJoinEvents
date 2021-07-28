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
    await newUser.save()

    correo.enviaCorreo(newUser, 'Bienvenida', (err) =>{
      if(!err){
        res.status(400).json({err})
      }
    })

    return res.status(200).json({
      newUser 
    })
  } catch(error) {
    res.status(400).json({error})
  }
});

module.exports = router;
