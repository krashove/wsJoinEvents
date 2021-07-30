var express = require('express');
var router = express.Router();
let user = require('../models/User');
let events = require('../models/Evento');
let categorias = require('../models/Categoria');

router.post('/create', async function(req, res, next){
    if (!req.body.evento){
        return res.status(401).json({message: 'No envio parametros de autenticacion.'});
    }
    try{
        var proveedor = await user.findByCredentials(req.body.proveedor.token)
        if (proveedor.tipoUser != 'proveedor'){
            return res.status(400).json({error: 'el usuario no es proveedor.'})
        }

        var evento = new events(req.body.evento)
        evento.idProveedor = proveedor._id
        
        await evento.save()

        return res.status(200).json({
            evento,
            error: '' 
        })
    } catch(error) {
        return res.status(400).json({error})
    }
});

router.post('/publicar', async function(req, res, next){
    if (!req.body.evento){
        return res.status(401).json({message: 'No envio parametros de autenticacion.'});
    }
    try{
        var evento = await events.findByCredentials(req.body.evento.id)
        if (evento.estado != 'creado'){
            return res.status(400).json({error: 'el evento no se encuentra en estado creado.'})
        }

        evento.estado = 'publicado'
        await evento.save()

        return res.status(200).json({
            evento,
            error: '' 
        })
    } catch(error) {
        return res.status(400).json({error})
    }
});

router.post('/terminado', async function(req, res, next){
    if (!req.body.evento){
        return res.status(401).json({message: 'No envio parametros de autenticacion.'});
    }
    try{
        var evento = await events.findByCredentials(req.body.evento.id)
        if (evento.estado != 'publicado'){
            return res.status(400).json({error: 'el evento no se encuentra en estado publicado.'})
        }

        evento.estado = 'terminado'
        await evento.save()

        return res.status(200).json({
            evento,
            error: '' 
        })
    } catch(error) {
        return res.status(400).json({error})
    }
});

router.post('/listDisponibles', async function(req, res, next){
    try{
        var eventos = await events.findDisponibles()

        return res.status(200).json({
            eventos,
            error: '' 
        })
    } catch(error) {
        return res.status(400).json({error})
    }
});

router.post('/listProveedor', async function(req, res, next){
    try{
        var eventos = await events.findProveedor(req.body.proveedor.id)

        return res.status(200).json({
            eventos,
            error: '' 
        })
    } catch(error) {
        return res.status(400).json({error})
    }
});

/*********** Categoria ***********/
router.post('/createCategoria', async function(req, res, next){
    if (!req.body.categoria){
        return res.status(401).json({message: 'No envio parametros de categoria.'});
    }
    try{
        var categoria = new categorias(req.body.categoria)

        categoria.save()

        return res.status(200).json({
            categoria,
            error: '' 
        })
    } catch(error) {
        return res.status(400).json({error})
    }
});

router.post('/deleteCategoria', async function(req, res, next){
    try{
        var infodelete = await categorias.deleteOne({ _id: req.body.categoria.id})
    
        return res.status(200).json({infodelete, 
            error:''})
    } catch(error){
        return res.status(400).json({error})
    }
});

module.exports = router;